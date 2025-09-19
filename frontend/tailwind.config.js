/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // SalesHostel Brand Colors
        "primary-green": {
          DEFAULT: "#00B517",
          50: "#E6F7E6",
          100: "#CCEFCC",
          200: "#99DF99",
          300: "#66CF66",
          400: "#33BF33",
          500: "#00B517",
          600: "#009113",
          700: "#006D0F",
          800: "#00490A",
          900: "#002505",
          950: "#001203",
          light: "#E6F7E6",
          dark: "#008F13",
        },
        "secondary-orange": {
          DEFAULT: "#FF8C00",
          50: "#FFF4E6",
          100: "#FFE9CC",
          200: "#FFD399",
          300: "#FFBD66",
          400: "#FFA733",
          500: "#FF8C00",
          600: "#CC7000",
          700: "#995400",
          800: "#663800",
          900: "#331C00",
          light: "#FFF4E6",
        },
        "accent-blue": {
          DEFAULT: "#0066CC",
          50: "#E6F2FF",
          100: "#CCE5FF",
          200: "#99CBFF",
          300: "#66B1FF",
          400: "#3397FF",
          500: "#0066CC",
          600: "#0052A3",
          700: "#003D7A",
          800: "#002952",
          900: "#001429",
        },

        // Admin Theme Colors
        admin: {
          primary: {
            DEFAULT: "#00B517",
            50: "#E6F7E6",
            100: "#CCEFCC",
            200: "#99DF99",
            300: "#66CF66",
            400: "#33BF33",
            500: "#00B517",
            600: "#009113",
            700: "#006D0F",
            800: "#00490A",
            900: "#002505",
          },
          secondary: "#64748b",
          success: "#059669",
          warning: "#d97706",
          danger: "#dc2626",
          gray: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
          },
        },

        // Supplier Theme Colors
        supplier: {
          primary: "#059669",
          secondary: "#0891B2",
          accent: "#7C3AED",
        },

        // Staff Theme Colors
        staff: {
          primary: "#7C3AED",
          secondary: "#DB2777",
          accent: "#059669",
        },

        // Customer Theme Colors
        customer: {
          primary: "#00B517",
          secondary: "#FF8C00",
          accent: "#0066CC",
        },
      },

      fontFamily: {
        primary: ["Montserrat", "system-ui", "sans-serif"],
        secondary: ["Poppins", "system-ui", "sans-serif"],
        display: ["Raleway", "system-ui", "sans-serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },

      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      boxShadow: {
        "glass-sm":
          "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        "glass-md":
          "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
        "glass-lg":
          "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
        "admin-glow": "0 0 20px rgba(30, 64, 175, 0.3)",
        "customer-glow": "0 0 20px rgba(124, 58, 237, 0.3)",
      },

      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "bounce-in": "bounceIn 0.6s ease-out",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite alternate",
        "gradient-shift": "gradientShift 3s ease infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%": { boxShadow: "0 0 5px rgba(124, 58, 237, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
