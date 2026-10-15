/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      sm: "340px",
      md: "540px",
      lg: "768px",
      xl: "1180px"
    },
    extend: {
      // Gaia Labs brand palette (sampled from the logo)
      colors: {
        cream: { DEFAULT: "#F5F4F0", 100: "#FBFAF7", 200: "#ECEAE3", 300: "#DEDBD2" },
        ink: { DEFAULT: "#1E1E1E", soft: "#45443F", muted: "#6B6A63" },
        leaf: { DEFAULT: "#87A375", dark: "#4E6B40", light: "#DCE6D3" },
      },
    },
    keyframes: {
      move: {
        "50%": { transform: "translateY(-1rem)" }
      },
      rotate: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      scaleUp: {
        "0%": { transform: "scale(0.8)" },
        "50%": { transform: "scale(1.2)" },
        "100%": { transform: "scale(0.8)" },

      },
      drip: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(5px)" },
      },
      signal: {
        "0%, 100%": { transform: "scale(1)", opacity: "1" },
        "50%": { transform: "scale(1.2)", opacity: "0.5" },
      },
      grow: {
        "0%, 100%": { transform: "scaleY(1)" },
        "50%": { transform: "scaleY(1.2)" },
      },
      sway: {
        "0%, 100%": { transform: "rotate(-4deg)" },
        "50%": { transform: "rotate(4deg)" },
      }
    },
    animation: {
      movingY: "move 3s linear infinite",
      rotating: "rotate 15s linear infinite",
      scalingUp: "scaleUp 3s linear infinite",
      // subsystem strip icons (hover)
      spinSlow: "rotate 4s linear infinite",
      drip: "drip 1s ease-in-out infinite",
      signal: "signal 1s ease-in-out infinite",
      grow: "grow 1.2s ease-in-out infinite",
      // corner leaves
      sway: "sway 7s ease-in-out infinite",
    },
    fontFamily: {
      Jost: ["Jost", "sans-serif"],
      Mono: ["JetBrains Mono", "monospace"],
      Lobster: ["Lobster", "sans-serif"]
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
        md: "32px"
      }
    }
  },
  plugins: [],
}
