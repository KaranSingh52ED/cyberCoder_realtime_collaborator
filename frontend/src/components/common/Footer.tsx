import { HiHeart } from 'react-icons/hi2'

function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-white/[0.02] py-6 backdrop-blur-sm sm:py-7">
            <div className="container mx-auto flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 sm:text-base">
                        <span>© 2024 CyberCode</span>
                    </div>
                    <span className="hidden h-1 w-1 rounded-full bg-gray-600 sm:block" />
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 sm:text-base">
                        <span>Built with</span>
                        <HiHeart className="h-4 w-4 text-red-400" />
                        <span>by</span>
                        <a
                            href="https://kabiratechie.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded font-semibold text-purple-400 transition-colors duration-200 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
                        >
                            React Rangers
                        </a>
                    </div>
                    <span className="hidden h-1 w-1 rounded-full bg-gray-600 sm:block" />
                    <span className="text-xs font-medium text-gray-500 sm:text-sm">
                        Enterprise-Ready Collaborative Development Platform
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
