import { useFileSystem } from '@/context/FileContext'
import { useSocket } from '@/context/SocketContext'
import { SocketEvent } from '@/types/socket'
import { useState } from 'react'
import { HiSparkles } from 'react-icons/hi2'
import { toast } from 'react-hot-toast'

function CodeFormatButton() {
    const { activeFile, setActiveFile } = useFileSystem()
    const { socket } = useSocket()
    const [isFormatting, setIsFormatting] = useState(false)

    const formatCode = () => {
        if (!activeFile) {
            toast.error('Please open a file to format')
            return
        }

        setIsFormatting(true)
        const content = activeFile.content

        try {
            // Basic formatting - indent with 4 spaces
            let formatted = content
                .split('\n')
                .map((line) => {
                    // Remove trailing whitespace
                    line = line.trimEnd()
                    return line
                })
                .join('\n')

            // Remove multiple blank lines (more than 2 consecutive)
            formatted = formatted.replace(/\n{3,}/g, '\n\n')

            // Add trailing newline if not present
            if (formatted && !formatted.endsWith('\n')) {
                formatted += '\n'
            }

            // Update file content
            const updatedFile = { ...activeFile, content: formatted }
            setActiveFile(updatedFile)

            // Emit socket event for collaboration
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: formatted,
            })

            toast.success('Code formatted successfully')
        } catch (error) {
            toast.error('Failed to format code')
            console.error('Formatting error:', error)
        } finally {
            setIsFormatting(false)
        }
    }

    return (
        <button
            onClick={formatCode}
            disabled={isFormatting || !activeFile}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            title="Format Code (Beautify)"
        >
            <HiSparkles className={`h-4 w-4 ${isFormatting ? 'animate-spin' : ''}`} />
            <span>{isFormatting ? 'Formatting...' : 'Format'}</span>
        </button>
    )
}

export default CodeFormatButton
