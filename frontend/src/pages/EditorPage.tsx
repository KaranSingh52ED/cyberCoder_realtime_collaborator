import SplitterComponent from '@/components/SplitterComponent'
import ConnectionStatusPage from '@/components/connection/ConnectionStatusPage'
import Sidebar from '@/components/sidebar/Sidebar'
import WorkSpace from '@/components/workspace'
import KeyboardShortcutsModal from '@/components/common/KeyboardShortcutsModal'
import ShareWorkspaceModal from '@/components/common/ShareWorkspaceModal'
import { useAppContext } from '@/context/AppContext'
import { useSocket } from '@/context/SocketContext'
import useFullScreen from '@/hooks/useFullScreen'
import useUserActivity from '@/hooks/useUserActivity'
import { SocketEvent } from '@/types/socket'
import { USER_STATUS, User } from '@/types/user'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function EditorPage() {
    // Listen user online/offline status
    useUserActivity()
    // Enable fullscreen mode
    useFullScreen()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const { status, setCurrentUser, currentUser } = useAppContext()
    const { socket } = useSocket()
    const location = useLocation()
    const [showShortcuts, setShowShortcuts] = useState(false)
    const [showShare, setShowShare] = useState(false)

    useEffect(() => {
        if (currentUser.username.length > 0) return
        const username = location.state?.username
        if (username === undefined) {
            navigate('/', {
                state: { roomId },
            })
        } else if (roomId) {
            const user: User = { username, roomId }
            setCurrentUser(user)
            socket.emit(SocketEvent.JOIN_REQUEST, user)
        }
    }, [currentUser.username, location.state?.username, navigate, roomId, setCurrentUser, socket])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+K for shortcuts
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault()
                setShowShortcuts((prev) => !prev)
            }
            // Ctrl+Shift+S for share
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault()
                setShowShare(true)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    if (status === USER_STATUS.CONNECTION_FAILED) {
        return <ConnectionStatusPage />
    }

    return (
        <>
            <SplitterComponent>
                <Sidebar />
                <WorkSpace />
            </SplitterComponent>
            <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
            <ShareWorkspaceModal isOpen={showShare} onClose={() => setShowShare(false)} />
        </>
    )
}

export default EditorPage
