import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '200px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        glow: [
          "0 0px 8px rgba(0, 188, 212, 0.45)",
          "0 0px 10px rgba(0, 188, 212, 0.3)",
        ]
      },
      fontFamily: {
          'starwar' : ['Star Wars', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
