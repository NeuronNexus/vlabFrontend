/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(187, 85%, 53%)',
        background: 'hsl(222, 47%, 6%)',
        foreground: 'hsl(210, 40%, 96%)',
        card: 'hsl(222, 47%, 8%)',
        border: 'hsl(217, 33%, 20%)',
        muted: {
          DEFAULT: 'hsl(217, 33%, 14%)',
          foreground: 'hsl(215, 20%, 55%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
