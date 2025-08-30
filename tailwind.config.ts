import { type Config } from "tailwindcss";


const config : Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', 
  theme: {
    extend : {
      colors: {    
        trueblue: { DEFAULT: '#4062BB' },
      },
    },
  },
};

export default config; 


