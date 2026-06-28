import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-space-mono)', 'Courier New', 'monospace'],
        syne: ['var(--font-syne)', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      colors: {
        ink: '#0A0907',
        paper: '#EDEBE3',
        available: '#3EC96B',
      },
    },
  },
  plugins: [],
}

export default config
