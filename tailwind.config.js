import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0159DF",
        menu: "#F5F5F5",
        heading: "#1C4481",
        title: "#383838",
        description: "#777777",
      },
      fontFamily: {
        sans: ["Sofia Pro", "var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        fadeIn: "fadeIn 400ms ease-in-out",
        fadeOut: "fadeOut 400ms ease-in-out",
        scaleIn: "scaleIn 400ms ease-in-out",
        fadeInScaleIn: "fadeInScaleIn 400ms ease-in-out",
        leftAndRight: "leftAndRight 1s linear infinite",
        spin: "spin 1s linear infinite",
        levitate: "levitate 12s linear infinite",
      },
      keyframes: {
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        leftAndRight: {
          "0%": {
            transform: "translateX(0px)",
          },
          "50%": {
            transform: "translateX(6px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        spin: {
          "100%": {
            transform: "rotate(100%)",
          },
        },
        fadeInScaleIn: {
          "0%": {
            opacity: "0",
            // transform: "translateY(20px)",
            transform: "scale(1.03)",
          },
          "100%": {
            opacity: "1",
            // transform: "translateY(0px)",
            transform: "scale(1)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        scaleIn: {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        levitate: {
          "0%": {
            transform: "translateY(0)",
          },
          "30%": {
            transform: "translateY(-10px)",
          },
          "50%": {
            transform: "translateY(4px)",
          },
          "70%": {
            transform: "translateY(-15px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          default: {
            foreground: "#383838",
          },
        }
      }
    }
  })],
}
