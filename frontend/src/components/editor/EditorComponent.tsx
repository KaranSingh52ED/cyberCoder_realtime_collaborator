import { useFileSystem } from '@/context/FileContext'
import useResponsive from '@/hooks/useResponsive'
import cn from 'classnames'
import CodeFormatButton from '@/components/common/CodeFormatButton'
import Editor from './Editor'
import FileTab from './FileTab'

function EditorComponent() {
    const { openFiles } = useFileSystem()
    const { minHeightReached } = useResponsive()

    if (openFiles.length <= 0) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <h1 className="text-xl text-white">No file is currently open.</h1>
            </div>
        )
    }

    return (
        <main
            className={cn('relative flex w-full flex-col overflow-x-auto md:h-screen', {
                'h-[calc(100vh-50px)]': !minHeightReached,
                'h-full': minHeightReached,
            })}
        >
            <div className="relative">
                <FileTab />
                <div className="absolute right-2 top-2 z-10">
                    <CodeFormatButton />
                </div>
            </div>
            <Editor />
        </main>
    )
}

export default EditorComponent
