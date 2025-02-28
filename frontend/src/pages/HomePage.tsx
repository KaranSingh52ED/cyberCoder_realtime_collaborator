import Footer from "@/components/common/Footer"
import FormComponent from "@/components/forms/FormComponent"

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-blue-100 to-blue-400 p-4 text-gray-900">
            <div className="container mx-auto flex flex-col items-center justify-between px-6 py-12 lg:flex-row lg:py-24">
                {/* Text Section */}
                <div className="flex w-full max-w-md flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 drop-shadow-lg sm:text-5xl md:text-6xl">
                        Elevate Your Experience
                    </h1>
                    <p className="mt-6 text-lg text-gray-800 sm:text-xl md:text-2xl">
                        Streamline your coding journey with cutting-edge tools
                        and seamless integration.
                    </p>
                    <button className="mt-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400">
                        🚀 Get Started Now
                    </button>
                </div>

                {/* Form Section */}
                <div className="mt-12 w-full max-w-lg transform rounded-3xl bg-white p-2 shadow-2xl transition-all duration-300 hover:scale-105 sm:p-6 lg:mt-0">
                    <FormComponent />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default HomePage
