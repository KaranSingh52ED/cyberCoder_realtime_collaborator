import FormComponent from '@/components/forms/FormComponent'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { PiCode, PiChatCircle } from 'react-icons/pi'

function HomePage() {
    return (
        <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] animate-pulse rounded-full bg-purple-600/20 blur-3xl" />
                <div className="animate-pulse-delayed-1000 absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-3xl" />
                <div className="animate-pulse-delayed-500 absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/15 blur-3xl" />
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Main Content */}
            <div className="relative z-10 flex h-screen flex-col">
                {/* Hero Section */}
                <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-12 xl:gap-16">
                    {/* Left Content Section */}
                    <div className="animate-fade-in-up mb-8 flex w-full max-w-2xl flex-col items-center text-center opacity-0 lg:mb-0 lg:w-[48%] lg:items-start lg:text-left">
                        {/* Professional Badge */}
                        <div className="animate-delay-100 mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/10">
                            <div className="relative">
                                <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                                Enterprise-Grade Collaboration
                            </span>
                        </div>

                        {/* Main Heading - Refined Typography */}
                        <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                            <span className="block bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text text-transparent">
                                Code Together,
                            </span>
                            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Build Faster
                            </span>
                        </h1>

                        {/* Description - Professional Tone */}
                        <p className="mb-6 max-w-xl text-sm leading-6 text-gray-400 sm:text-base md:text-lg">
                            Empower your development team with real-time collaborative coding, instant synchronization,
                            and seamless workflow integration for faster, more efficient project delivery.
                        </p>

                        {/* Feature Pills - Professional Icons */}
                        <div className="mb-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                            <div className="group flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:ring-white/20">
                                <HiOutlineLightningBolt className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:scale-110" />
                                <span className="text-xs font-medium text-gray-300">Real-time Sync</span>
                            </div>
                            <div className="group flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:ring-white/20">
                                <PiCode className="h-3.5 w-3.5 text-blue-400 transition-transform group-hover:scale-110" />
                                <span className="text-xs font-medium text-gray-300">Collaborative Editing</span>
                            </div>
                            <div className="group flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:ring-white/20">
                                <PiChatCircle className="h-3.5 w-3.5 text-purple-400 transition-transform group-hover:scale-110" />
                                <span className="text-xs font-medium text-gray-300">Live Communication</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div
                        id="join-form"
                        className="animate-fade-in-up animate-delay-200 w-full max-w-lg transform opacity-0 transition-all duration-500 lg:w-[48%]"
                    >
                        <div className="relative">
                            {/* Subtle Glow effect behind form */}
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 opacity-50 blur-2xl" />

                            {/* Form Container */}
                            <div className="hover:bg-white/8 relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white/20 sm:p-6">
                                <FormComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
