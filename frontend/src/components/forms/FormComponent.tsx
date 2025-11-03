import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import logo from "@/assets/logo.jpg"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        toast.success("Created a new Room Id")
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.length === 0) {
            toast.error("Enter your username")
            return false
        } else if (currentUser.roomId.length === 0) {
            toast.error("Enter a room id")
            return false
        } else if (currentUser.roomId.length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return false
        } else if (currentUser.username.length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        toast.loading("Joining room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your username")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            setTimeout(() => {
                navigate(`/editor/${currentUser.roomId}`, {
                    state: {
                        username,
                    },
                })
            }, 3000)
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [
        currentUser,
        location.state?.redirect,
        navigate,
        setStatus,
        socket,
        status,
    ])

    return (
        <div className="flex w-full flex-col items-center justify-center gap-6">
            {/* Logo and Title */}
            <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
                <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-30 blur-lg" />
                    <img
                        src={logo}
                        alt="CyberCode Logo"
                        className="relative aspect-square h-20 w-20 rounded-full object-cover shadow-2xl ring-2 ring-purple-400/50 transition-all duration-300 hover:scale-110 hover:ring-cyan-400/50 sm:h-24 sm:w-24"
                    />
                </div>
                <h2 className="bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-4xl">
                    Join Your Workspace
                </h2>
                <p className="text-center text-sm text-gray-400 sm:text-base">
                    Enter your details to start coding together
                </p>
            </div>

            {/* Form */}
            <form onSubmit={joinRoom} className="w-full space-y-4">
                <div className="space-y-1">
                    <label className="ml-1 text-xs font-medium text-gray-400 sm:text-sm">
                        Room ID
                    </label>
                    <input
                        type="text"
                        name="roomId"
                        placeholder="Enter Room ID"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-gray-500 backdrop-blur-sm transition-all duration-200 focus:border-purple-400/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-500/30 sm:text-lg"
                        onChange={handleInputChanges}
                        value={currentUser.roomId}
                    />
                </div>
                <div className="space-y-1">
                    <label className="ml-1 text-xs font-medium text-gray-400 sm:text-sm">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-gray-500 backdrop-blur-sm transition-all duration-200 focus:border-purple-400/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-500/30 sm:text-lg"
                        onChange={handleInputChanges}
                        value={currentUser.username}
                        ref={usernameRef}
                    />
                </div>
                <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 py-3.5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 sm:py-4 sm:text-xl"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Join Room</span>
                        <svg
                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
            </form>

            {/* Generate Room ID Button */}
            <div className="w-full border-t border-white/10 pt-4">
                <button
                    className="group w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base font-medium text-gray-300 backdrop-blur-sm transition-all duration-200 hover:border-purple-400/50 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 sm:text-lg sm:py-3.5"
                    onClick={createNewRoomId}
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="h-5 w-5 transition-transform group-hover:rotate-90"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span>Generate Unique Room ID</span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default FormComponent
