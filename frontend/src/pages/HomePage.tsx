import Footer from "@/components/common/Footer"
import FormComponent from "@/components/forms/FormComponent"

function HomePage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl animate-pulse-delayed-1000" />
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl animate-pulse-delayed-500" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Main Content */}
            <div className="relative z-10 flex min-h-screen flex-col">
                {/* Hero Section */}
                <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-row lg:py-24">
                    {/* Left Content Section */}
                    <div className="mb-12 flex w-full max-w-2xl flex-col items-center text-center lg:mb-0 lg:w-1/2 lg:items-start lg:text-left">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 backdrop-blur-sm">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                            <span className="text-sm font-medium text-purple-300">
                                Real-time Collaboration
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
                            Code Together,
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Anywhere
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl md:text-2xl">
                            Streamline your coding journey with cutting-edge tools,
                            real-time collaboration, and seamless integration.
                            Build amazing things together with your team.
                        </p>

                        {/* Feature Pills */}
                        <div className="mb-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
                                ⚡ Real-time Sync
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
                                🎨 Collaborative Editing
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
                                💬 Live Chat
                            </span>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => {
                                document
                                    .getElementById("join-form")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span>🚀 Get Started Now</span>
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
                    </div>

                    {/* Form Section */}
                    <div
                        id="join-form"
                        className="w-full max-w-lg transform transition-all duration-500 lg:translate-y-0"
                    >
                        <div className="relative">
                            {/* Glow effect behind form */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-20 blur-xl transition-opacity duration-300" />
                            
                            {/* Form Container */}
                            <div className="relative rounded-3xl bg-white/10 p-6 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15 sm:p-8">
                                <FormComponent />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default HomePage
