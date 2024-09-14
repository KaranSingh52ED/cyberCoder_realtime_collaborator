/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{jsx,tsx}", "./*.html"],
    theme: {
        extend: {
            colors: {
                dark: "#4d4d4d",
                darkHover: "#2d3962",
                light: "#f5f5f5",
                primary: "#ff9a3f",
                danger: "#ef4444",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                "up-down": "up-down 2s ease-in-out infinite alternate",
            },
            animation: {
                rotateAndLeave: "rotateAndLeave 3s forwards",
            },
        },
    },
    plugins: [],
}
