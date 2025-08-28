import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    theme: {
        extend: {
            colors: {
                "primary-color": "#009aff",
                "primary-color-light": "#00bbff",
                "primary-color-text": "#202020",
                "primary-color-heading": "#fff",
                "primary-color-bg": "#0f0f0f",
                "primary-color-bg-sidebar": "#1f1f1f"
            },
            fontFamily: {
                sans: [
                    '"Mona Sans"',
                    '"MonaSansFallback"',
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"'
                ],
                mono: ["monospace"]
            }
        }
    }
} satisfies Config;
