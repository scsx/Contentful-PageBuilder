import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        secondary: '#a855f7',
        alternative: '#ef4444',
        neutral: '#c1c2c4'
      },
      spacing: {
        '20': '5rem'
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '1440px'
        }
      }
    }
  },
  plugins: []
}

export default config
