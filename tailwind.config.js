/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': {'max': '640px'},
  
        'md': {'min': '768px', 'max': '1023px'},
  
        'lg': {'min': '1024px', 'max': '1279px'},
  
        'xl': {'min': '1280px', 'max': '1535px'},
  
        '2xl': {'min': '1536px'},
  
        'md-xl': {'min': '767px', 'max': '3000px'},
      },
    }
  },
  plugins: [],
};