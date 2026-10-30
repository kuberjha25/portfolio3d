/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
      },
      colors: {
        // Base palette: warm near-black with an orange accent taken from the hero photo
        ink: "#0a0a0a",
        surface: "#111111",
        "surface-2": "#171717",
        line: "rgba(255,255,255,0.08)",
        cream: "#f2ede6",
        muted: "#8f8a84",
        accent: "#ff8a4c",
        "accent-soft": "#ffb38a",
        cool: "#8ab4ff",
        // Older names still used in a few places
        primary: "#0a0a0a",
        secondary: "#8f8a84",
        tertiary: "#171717",
        "black-100": "#111111",
        "black-200": "#0f0f0f",
        "white-100": "#f2ede6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        kuber: ["Kuber", "Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
