import { useAppContext } from '@/context/AppContext'
import { useSocket } from '@/context/SocketContext'
import { SocketEvent } from '@/types/socket'
import { USER_STATUS } from '@/types/user'
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import logo from '@/assets/logo.jpg'
import { HiOutlineKey, HiOutlineUser } from 'react-icons/hi'
import { HiArrowRight, HiPlus } from 'react-icons/hi2'
import { PiSignIn } from 'react-icons/pi'

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        const newRoomId = uuidv4()
        setCurrentUser({ ...currentUser, roomId: newRoomId })
        toast.success('New workspace created successfully')
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error('Please enter your username')
            return false
        }
        if (currentUser.roomId.trim().length === 0) {
            toast.error('Please enter a workspace ID')
            return false
        }
        if (currentUser.roomId.trim().length < 5) {
            toast.error('Workspace ID must be at least 5 characters')
            return false
        }
        if (currentUser.username.trim().length < 3) {
            toast.error('Username must be at least 3 characters')
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        toast.loading('Connecting to workspace...')
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success('Please enter your username to continue')
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem('redirect') || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem('redirect', 'true')
            setTimeout(() => {
                navigate(`/editor/${currentUser.roomId}`, {
                    state: {
                        username,
                    },
                })
            }, 3000)
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem('redirect')
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    return (
        <div className="flex w-full flex-col items-center justify-center gap-5">
            {/* Logo and Title */}
            <div className="flex w-full flex-col items-center gap-3">
                <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-cyan-500/40 blur-xl" />
                    <img
                        src={logo}
                        alt="CyberCode Logo"
                        className="relative aspect-square h-16 w-16 rounded-full object-cover shadow-xl ring-2 ring-white/20 transition-all duration-300 hover:scale-105 hover:ring-purple-400/40 sm:h-20 sm:w-20"
                    />
                </div>
                <div className="space-y-1 text-center">
                    <h2 className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-xl font-bold leading-tight text-transparent sm:text-2xl">
                        Join Your Workspace
                    </h2>
                    <p className="text-xs font-medium text-gray-400">
                        Enter your credentials to access the collaborative development environment
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={joinRoom} className="w-full space-y-4">
                {/* Room ID Input */}
                <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <HiOutlineKey className="h-3 w-3" />
                        Workspace ID
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="roomId"
                            placeholder="Enter or generate a workspace ID"
                            className="focus:bg-white/8 w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            onChange={handleInputChanges}
                            value={currentUser.roomId}
                        />
                    </div>
                </div>

                {/* Username Input */}
                <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <HiOutlineUser className="h-3 w-3" />
                        Username
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your display name"
                            className="focus:bg-white/8 w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            onChange={handleInputChanges}
                            value={currentUser.username}
                            ref={usernameRef}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === USER_STATUS.ATTEMPTING_JOIN}
                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.01] hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <PiSignIn className="h-4 w-4" />
                        <span>{status === USER_STATUS.ATTEMPTING_JOIN ? 'Connecting...' : 'Join Workspace'}</span>
                        <HiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
            </form>

            {/* Divider */}
            <div className="flex w-full items-center gap-2.5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
                <span className="text-xs font-medium text-gray-500">OR</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
            </div>

            {/* Generate Room ID Button */}
            <button
                className="hover:bg-white/8 group flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-gray-300 backdrop-blur-sm transition-all duration-200 hover:border-purple-400/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                onClick={createNewRoomId}
            >
                <HiPlus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                <span>Generate New Workspace ID</span>
            </button>
        </div>
    )
}

export default FormComponent
