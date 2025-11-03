function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-white/5 py-6 backdrop-blur-sm sm:py-8">
            <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 sm:flex-row">
                <span className="text-sm text-gray-400 sm:text-base">
                    Made with ❤️ by Team{" "}
                    <a
                        href="https://kabiratechie.online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-purple-400 transition-colors duration-200 hover:text-cyan-400"
                    >
                        React Rangers
                    </a>
                </span>
                <span className="hidden text-gray-500 sm:inline">•</span>
                <span className="text-xs text-gray-500 sm:text-sm">
                    Real-time Collaborative Code Editor
                </span>
            </div>
        </footer>
    )
}

export default Footer
