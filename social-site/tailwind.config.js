/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['CustomFont', 'Rubik'],
        roundy: ['RoundyFont', 'Poppins']
      },
    },
  
    fontSize: {
      '2xl': '2.8rem', 
      
    }
   
  },
  plugins: [require("daisyui")],
}
// module.exports = {
//   theme: {
//     fontSize: {
//       'sm': '0.875rem', // Example override for small font size
//       'base': '1rem',   // Default base font size
//       'lg': '1.125rem', // Default large font size
//       // Add more custom font sizes as needed
//     }
//   },
//   // Other Tailwind settings...
// }
