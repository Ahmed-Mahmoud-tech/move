/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        whiteColor: 'var(--whiteColor)',
        blackColor: 'var(--blackColor)',
        mainColor: 'var(--mainColor)',
        secondColor: 'var(--secondColor)',
        thirdColor: 'var(--thirdColor)',
        darkBg: 'var(--darkBg)',
        error: 'var(--error)',
        darkBlueColor: 'var(--darkBlueColor)',
        yellowColor: 'var(--yellowColor)',
      },
    },
  },
  plugins: [],
};
