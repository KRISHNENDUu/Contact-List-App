/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // **NEW**: Add safelist for dynamic colors used in ActionModal
 safelist: [ // Keep the previous safelist
    'text-green-400', 'bg-green-600', 'hover:bg-green-700', 'focus:ring-green-500',
    'bg-red-600', 'hover:bg-red-700', 'focus:ring-red-500', // Added red for end call
    'text-blue-400',   'bg-blue-600',   'hover:bg-blue-700',   'focus:ring-blue-500',
    'text-purple-400', 'bg-purple-600', 'hover:bg-purple-700', 'focus:ring-purple-500',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        // **NEW**: Add pulsing keyframes
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.6' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.4s ease-out',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'blob': 'blob 7s infinite',
        // **NEW**: Add pulse animation utility
        'pulse-slow': 'pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}