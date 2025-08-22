import { type Config } from "tailwindcss";


const exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend : {
      colors: {    
        trueblue: { DEFAULT: '#4062BB' },
      },
    },
  },
};

module.exports = config; 


