module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3da9fc',
        secondary: '#90b4ce',
        danger: '#ef4565',
        success: '#2cb67d',
        dSec: '#212121',
        dPri: '#3d3d3d',
      },
    },
  },
  plugins: [],
};
