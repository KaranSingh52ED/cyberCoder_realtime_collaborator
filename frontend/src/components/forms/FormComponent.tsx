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
        <div className="flex w-full max-w-[90vw] flex-col items-center justify-center gap-6 rounded-[2rem] bg-gradient-to-r from-gray-800 to-gray-900 p-6 shadow-xl ring-2 ring-gray-600/50 backdrop-blur-lg sm:p-8 md:max-w-2xl md:rounded-[2.5rem] md:p-10 lg:max-w-4xl lg:gap-8 lg:p-12 xl:max-w-6xl">
            <div className="@container flex w-full flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
                <img
                    src={logo}
                    alt="CyberCode Logo"
                    className="aspect-square h-[clamp(4rem,10vw,6rem)] w-auto rounded-full object-cover shadow-lg ring-2 ring-blue-400/80 transition-all duration-300 hover:ring-blue-300"
                />
                <h1 className="bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-tight text-transparent">
                    CyberCode
                </h1>
            </div>

            <form onSubmit={joinRoom} className="w-full space-y-4 sm:space-y-6">
                <input
                    type="text"
                    name="roomId"
                    placeholder="Enter Room ID"
                    className="w-full rounded-xl border-2 border-blue-400/20 bg-gray-700/90 px-4 py-3 text-base backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 sm:text-lg md:py-4 lg:text-xl"
                    onChange={handleInputChanges}
                    value={currentUser.roomId}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="w-full rounded-xl border-2 border-blue-400/20 bg-gray-700/90 px-4 py-3 text-base backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 sm:text-lg md:py-4 lg:text-xl"
                    onChange={handleInputChanges}
                    value={currentUser.username}
                    ref={usernameRef}
                />
                <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 py-3 text-lg font-semibold shadow-lg ring-white/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus:scale-100 focus:ring-2 sm:py-4 md:text-xl"
                >
                    Join Room
                </button>
            </form>

            <button
                className="w-full rounded-xl bg-gray-100/90 py-3 text-base font-medium text-blue-700 shadow-md ring-blue-400/50 transition-all hover:bg-gray-200 hover:text-blue-800 hover:shadow-lg focus:ring-2 sm:text-lg md:py-4 md:text-xl"
                onClick={createNewRoomId}
            >
                Generate Unique Room ID
            </button>
        </div>
    )
}

export default FormComponent
