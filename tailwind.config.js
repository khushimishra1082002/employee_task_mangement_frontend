/** @type {import('tailwindcss').Config} */


import typography from '@tailwindcss/typography';  // Importing Tailwind plugins
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Urbanist: ["Urbanist", "serif"],
        Oswald: ["Oswald", "serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Roboto: ["Roboto", "serif"],
        Poppins: ["Poppins", "serif"],
        Lato: ["Lato", "serif"],
        RobotoFlex: ["Roboto Flex", "sans-serif"],
        Inter: ["Inter", "serif"],

      },
      colors: {
        skin: {
          primary: "var(--color-primary-color)",
          secondary: "var(--color-secondary-color)",
          white_shade: "var(--color-white)",
          accent_one: "var(--color-accent-color)",
          accent_two: "var(--color-accent-color2)",
          accent_three: "var(--color-accent-color3)",
          accent_four: "var(--color-accent-color4)",
          accent_five: "var(--color-accent-color5)",
          accent_six: "var(--color-accent-color6)",
          accent_seven: "var(--color-accent-color7)",
          accent_eight: "var(--color-accent-color8)",
          accent_nine: "var(--color-accent-color9)",
        },}
    },
  },
  plugins: [typography, forms],  // Using imported plugins
};
