/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a', // Dark background
                surface: '#121212', // Slightly lighter surface
                primary: '#00f3ff', // Cyan neon
                secondary: '#ff00ff', // Pink neon
                accent: '#7000ff', // Purple neon
                muted: '#a1a1aa',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'], // For headings
            },
            boxShadow: {
                'neon-cyan': '0 0 5px #00f3ff, 0 0 10px #00f3ff',
                'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff',
            },
        },
    },
    plugins: [],
}
