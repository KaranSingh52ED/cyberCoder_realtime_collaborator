import { useEffect } from 'react'
import { HiX } from 'react-icons/hi2'

interface KeyboardShortcutsModalProps {
    isOpen: boolean
    onClose: () => void
}

interface Shortcut {
    keys: string[]
    description: string
    category: string
}

const shortcuts: Shortcut[] = [
    { keys: ['Ctrl', 'F'], description: 'Find in file', category: 'Editor' },
    { keys: ['Ctrl', 'H'], description: 'Find & Replace', category: 'Editor' },
    { keys: ['Ctrl', '/'], description: 'Toggle comment', category: 'Editor' },
    { keys: ['Ctrl', 'S'], description: 'Save file', category: 'Editor' },
    { keys: ['Ctrl', 'Z'], description: 'Undo', category: 'Editor' },
    { keys: ['Ctrl', 'Y'], description: 'Redo', category: 'Editor' },
    { keys: ['Ctrl', 'D'], description: 'Duplicate line', category: 'Editor' },
    { keys: ['Alt', '↑'], description: 'Move line up', category: 'Editor' },
    { keys: ['Alt', '↓'], description: 'Move line down', category: 'Editor' },
    { keys: ['Ctrl', 'K'], description: 'Show keyboard shortcuts', category: 'General' },
    { keys: ['Ctrl', 'B'], description: 'Toggle sidebar', category: 'General' },
    { keys: ['F11'], description: 'Toggle fullscreen', category: 'General' },
    { keys: ['Ctrl', 'Enter'], description: 'Run code', category: 'Execution' },
    { keys: ['Ctrl', 'Shift', 'P'], description: 'Command palette', category: 'General' },
]

function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const categories = Array.from(new Set(shortcuts.map((s) => s.category)))

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <HiX className="h-5 w-5" />
                    </button>
                </div>

                <div className="max-h-[60vh] space-y-6 overflow-y-auto">
                    {categories.map((category) => (
                        <div key={category}>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
                                {category}
                            </h3>
                            <div className="space-y-2">
                                {shortcuts
                                    .filter((s) => s.category === category)
                                    .map((shortcut, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
                                        >
                                            <span className="text-sm text-gray-300">{shortcut.description}</span>
                                            <div className="flex items-center gap-1">
                                                {shortcut.keys.map((key, i) => (
                                                    <span key={i} className="flex items-center gap-1">
                                                        {i > 0 && <span className="text-gray-500">+</span>}
                                                        <kbd className="rounded border border-white/20 bg-white/10 px-2 py-1 text-xs font-medium text-gray-300">
                                                            {key}
                                                        </kbd>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 rounded-lg bg-blue-500/10 p-3 text-center text-sm text-blue-300">
                    Tip: Most shortcuts can be customized in Settings
                </div>
            </div>
        </div>
    )
}

export default KeyboardShortcutsModal
