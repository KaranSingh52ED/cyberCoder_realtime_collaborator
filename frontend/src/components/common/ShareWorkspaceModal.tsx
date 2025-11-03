import { useAppContext } from '@/context/AppContext'
import { useEffect, useState } from 'react'
import { HiCheck, HiClipboard } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { toast } from 'react-hot-toast'

interface ShareWorkspaceModalProps {
    isOpen: boolean
    onClose: () => void
}

function ShareWorkspaceModal({ isOpen, onClose }: ShareWorkspaceModalProps) {
    const { currentUser } = useAppContext()
    const [copied, setCopied] = useState(false)
    const inviteLink = `${window.location.origin}/editor/${currentUser.roomId}`

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

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink)
            setCopied(true)
            toast.success('Invite link copied to clipboard!')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error('Failed to copy link')
        }
    }

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(currentUser.roomId)
            toast.success('Workspace ID copied to clipboard!')
        } catch (err) {
            toast.error('Failed to copy workspace ID')
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Share Workspace</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <IoClose className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">Invite Link</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inviteLink}
                                readOnly
                                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                            >
                                {copied ? (
                                    <>
                                        <HiCheck className="h-4 w-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <HiClipboard className="h-4 w-4" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">Workspace ID</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={currentUser.roomId}
                                readOnly
                                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            />
                            <button
                                onClick={copyRoomId}
                                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <HiClipboard className="h-4 w-4" />
                                Copy ID
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                        <h3 className="mb-2 text-sm font-semibold text-blue-300">How to share:</h3>
                        <ol className="list-inside list-decimal space-y-1 text-xs text-blue-200/80">
                            <li>Copy the invite link above</li>
                            <li>Share it with your team members</li>
                            <li>They can join by entering the Workspace ID or using the direct link</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareWorkspaceModal
