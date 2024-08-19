import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      colors: {
        "primary": "#006769",
        
        "primary-100": "#1A7678",
        "primary-200": "#338587",
        "primary-300": "#4D9596",
        "primary-400": "#66A4A5",
        "primary-500": "#80B3B4",
        "primary-600": "#99C2C3",
        "primary-700": "#B3D1D2",
        "primary-800": "#CCE1E1",
        "primary-900": "#E6F0F0",
         
        "secondary": "#40A578"
      },
    },
  },
  plugins: [],
};
export default config;
