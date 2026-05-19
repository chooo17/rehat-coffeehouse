import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:   '#2C1810',
          mid:    '#6B3A2A',
          accent: '#D4956A',
          bg:     '#F5E6D3',
          light:  '#F5F2EC',
          cream:  '#f5f0e8',
          yellow: '#e8c84a',
          orange: '#ff4d00',
          black:  '#1a1a1a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
    },
  },
  plugins: [],
}
export default config
