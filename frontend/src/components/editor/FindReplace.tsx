import { useFileSystem } from '@/context/FileContext'
import { useSocket } from '@/context/SocketContext'
import { SocketEvent } from '@/types/socket'
import { useState, useEffect } from 'react'
import { HiX, HiMagnifyingGlass, HiArrowPath } from 'react-icons/hi2'
import { HiOutlineArrowsExpand, HiOutlineArrowsShrink } from 'react-icons/hi'

interface FindReplaceProps {
    onClose: () => void
    onFind?: (query: string, direction: 'next' | 'prev') => void
    onReplace?: (searchQuery: string, replaceQuery: string) => void
    onReplaceAll?: (searchQuery: string, replaceQuery: string) => void
}

function FindReplace({ onClose, onFind, onReplace, onReplaceAll }: FindReplaceProps) {
    const { activeFile, setActiveFile } = useFileSystem()
    const { socket } = useSocket()
    const [searchQuery, setSearchQuery] = useState('')
    const [replaceQuery, setReplaceQuery] = useState('')
    const [isReplaceMode, setIsReplaceMode] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [matchCount, setMatchCount] = useState(0)

    useEffect(() => {
        if (!activeFile || !searchQuery) {
            setMatchCount(0)
            return
        }

        const updateMatchCount = () => {
            const content = activeFile.content || ''
            const regex = new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
            const matches = content.match(regex)
            setMatchCount(matches ? matches.length : 0)
        }

        updateMatchCount()
    }, [searchQuery, activeFile])

    const handleFind = (direction: 'next' | 'prev') => {
        if (!searchQuery || !onFind) return
        onFind(searchQuery, direction)
    }

    const handleReplace = () => {
        if (!searchQuery || !replaceQuery || !activeFile) return

        if (onReplace) {
            onReplace(searchQuery, replaceQuery)
        } else {
            // Fallback implementation
            const content = activeFile.content
            const regex = new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
            const newContent = content.replace(regex, replaceQuery)

            setActiveFile({ ...activeFile, content: newContent })
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent,
            })
        }
    }

    const handleReplaceAll = () => {
        if (!searchQuery || !replaceQuery || !activeFile) return

        if (onReplaceAll) {
            onReplaceAll(searchQuery, replaceQuery)
        } else {
            // Fallback implementation
            const content = activeFile.content
            const regex = new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
            const newContent = content.replace(regex, replaceQuery)

            setActiveFile({ ...activeFile, content: newContent })
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent,
            })
        }
    }

    return (
        <div className="absolute right-2 top-2 z-50 w-full max-w-md rounded-lg border border-white/10 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <HiMagnifyingGlass className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-semibold text-white">Find & Replace</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="rounded p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                        title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? (
                            <HiOutlineArrowsShrink className="h-4 w-4" />
                        ) : (
                            <HiOutlineArrowsExpand className="h-4 w-4" />
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <HiX className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Find"
                        className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleFind('next')
                            if (e.key === 'Escape') onClose()
                        }}
                    />
                    {searchQuery && (
                        <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 text-xs text-gray-400">
                            {matchCount} {matchCount === 1 ? 'match' : 'matches'}
                        </div>
                    )}
                </div>

                {(isReplaceMode || isExpanded) && (
                    <input
                        type="text"
                        value={replaceQuery}
                        onChange={(e) => setReplaceQuery(e.target.value)}
                        placeholder="Replace"
                        className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleReplace()
                        }}
                    />
                )}

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleFind('prev')}
                        disabled={!searchQuery}
                        className="flex-1 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={() => handleFind('next')}
                        disabled={!searchQuery}
                        className="flex-1 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next →
                    </button>
                    {isReplaceMode && (
                        <>
                            <button
                                onClick={handleReplace}
                                disabled={!searchQuery || !replaceQuery}
                                className="flex-1 rounded-md bg-purple-600/80 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Replace
                            </button>
                            <button
                                onClick={handleReplaceAll}
                                disabled={!searchQuery || !replaceQuery}
                                className="rounded-md bg-blue-600/80 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Replace All"
                            >
                                <HiArrowPath className="h-4 w-4" />
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setIsReplaceMode(!isReplaceMode)}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                    {isReplaceMode ? 'Hide Replace' : 'Show Replace'}
                </button>
            </div>
        </div>
    )
}

export default FindReplace
