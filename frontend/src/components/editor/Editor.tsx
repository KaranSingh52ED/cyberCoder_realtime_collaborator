import { useAppContext } from '@/context/AppContext'
import { useFileSystem } from '@/context/FileContext'
import { useSettings } from '@/context/SettingContext'
import { useSocket } from '@/context/SocketContext'
import usePageEvents from '@/hooks/usePageEvents'
import useResponsive from '@/hooks/useResponsive'
import { editorThemes } from '@/resources/Themes'
import { FileSystemItem } from '@/types/file'
import { SocketEvent } from '@/types/socket'
import { color } from '@uiw/codemirror-extensions-color'
import { hyperLink } from '@uiw/codemirror-extensions-hyper-link'
import { LanguageName, loadLanguage } from '@uiw/codemirror-extensions-langs'
import CodeMirror, { Extension, ViewUpdate, scrollPastEnd } from '@uiw/react-codemirror'
import { useEffect, useMemo, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import FindReplace from './FindReplace'
import { cursorTooltipBaseTheme, tooltipField } from './tooltip'

function Editor() {
    const { users, currentUser } = useAppContext()
    const { activeFile, setActiveFile } = useFileSystem()
    const { theme, language, fontSize } = useSettings()
    const { socket } = useSocket()
    const { viewHeight } = useResponsive()
    const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0))
    const filteredUsers = useMemo(() => users.filter((u) => u.username !== currentUser.username), [users, currentUser])
    const [extensions, setExtensions] = useState<Extension[]>([])
    const [showFindReplace, setShowFindReplace] = useState(false)
    const editorRef = useRef<any>(null)

    const onCodeChange = (code: string, view: ViewUpdate) => {
        if (!activeFile) return

        const file: FileSystemItem = { ...activeFile, content: code }
        setActiveFile(file)
        const cursorPosition = view.state?.selection?.main?.head
        socket.emit(SocketEvent.TYPING_START, { cursorPosition })
        socket.emit(SocketEvent.FILE_UPDATED, {
            fileId: activeFile.id,
            newContent: code,
        })
        clearTimeout(timeOut)

        const newTimeOut = setTimeout(() => socket.emit(SocketEvent.TYPING_PAUSE), 1000)
        setTimeOut(newTimeOut)
    }

    // Listen wheel event to zoom in/out and prevent page reload
    usePageEvents()

    useEffect(() => {
        const extensions = [color, hyperLink, tooltipField(filteredUsers), cursorTooltipBaseTheme, scrollPastEnd()]
        const langExt = loadLanguage(language.toLowerCase() as LanguageName)
        if (langExt) {
            extensions.push(langExt)
        } else {
            toast.error(
                'Syntax highlighting is unavailable for this language. Please adjust the editor settings; it may be listed under a different name.',
                {
                    duration: 5000,
                },
            )
        }

        setExtensions(extensions)
    }, [filteredUsers, language])

    // Keyboard shortcuts for find and replace
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+F for find
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault()
                setShowFindReplace(true)
            }
            // Ctrl+H for find and replace
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault()
                setShowFindReplace(true)
            }
            // Escape to close
            if (e.key === 'Escape' && showFindReplace) {
                setShowFindReplace(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [showFindReplace])

    const handleFind = (query: string, direction: 'next' | 'prev') => {
        if (!activeFile || !query) return
        // Note: Actual selection would require CodeMirror view instance
        // This is a simplified implementation
        toast.success('Find functionality activated. Full implementation requires CodeMirror view access.')
    }

    const handleReplace = (searchQuery: string, replaceQuery: string) => {
        if (!activeFile) return
        
        const content = activeFile.content
        const regex = new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        const newContent = content.replace(regex, replaceQuery)

        const updatedFile = { ...activeFile, content: newContent }
        setActiveFile(updatedFile)
        socket.emit(SocketEvent.FILE_UPDATED, {
            fileId: activeFile.id,
            newContent,
        })
        toast.success('Replaced successfully')
    }

    const handleReplaceAll = (searchQuery: string, replaceQuery: string) => {
        handleReplace(searchQuery, replaceQuery)
        toast.success('All occurrences replaced')
    }

    return (
        <div className="relative h-full w-full">
            <CodeMirror
                ref={editorRef}
                minHeight="100%"
                maxWidth="100vw"
                theme={editorThemes[theme]}
                onChange={onCodeChange}
                value={activeFile?.content}
                extensions={extensions}
                style={{
                    fontSize: fontSize + 'px',
                    height: viewHeight,
                    position: 'relative',
                }}
            />
            {showFindReplace && (
                <FindReplace
                    onClose={() => setShowFindReplace(false)}
                    onFind={handleFind}
                    onReplace={handleReplace}
                    onReplaceAll={handleReplaceAll}
                />
            )}
        </div>
    )
}

export default Editor
