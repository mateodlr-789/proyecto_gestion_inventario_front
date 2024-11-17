import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'media',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        customDark: '#191619',
        customDark2: '#080707',
        customDark3: '#0e0e0e',
        inputDark: '#100e10',
        darkModebg: '#121212',
        darkModeBgOverlay: '#1e1e1e',
        darkModeBgbutton: '#363636',
        darkModeBgOrange:'#F9A825'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;