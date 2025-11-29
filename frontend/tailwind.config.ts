import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                teleton: {
                    red: "#D6001C",
                    dark: "#A60016",
                    light: "#FFE5E8",
                },
            },
            animation: {
                heartbeat: 'heartbeat 1.5s ease-in-out infinite',
            },
            keyframes: {
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '15%': { transform: 'scale(1.15)' },
                    '30%': { transform: 'scale(1)' },
                    '45%': { transform: 'scale(1.15)' },
                    '60%': { transform: 'scale(1)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;