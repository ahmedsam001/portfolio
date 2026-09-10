import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        // Backgrounds
        "bg-base": "#FAF6EC",
        "bg-alt": "#F3EDDF",
        surface: "#FFFFFF",
        border: "#E8E1D0",

        // Primary – Emerald Teal
        primary: "#0F6E5C",
        "primary-dark": "#0B5548",
        "primary-tint": "#E4F2ED",

        // Accent – Warm Orange (CTAs only)
        accent: "#E8792E",
        "accent-dark": "#C7601E",
        "accent-tint": "#FCE9D9",

        // Text
        "text-primary": "#1F2A22",
        "text-secondary": "#55604F",
        "text-on-dark": "#FAF6EC",

        // Utility
        success: "#2E8B57",
        "focus-ring": "#0F6E5C",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(15,110,92,0.07), 0 1px 3px 0 rgba(0,0,0,0.05)",
        "card-hover":
          "0 8px 28px 0 rgba(15,110,92,0.13), 0 2px 8px 0 rgba(0,0,0,0.07)",
        "teal-glow": "0 0 0 4px rgba(15,110,92,0.18), 0 0 24px 8px rgba(15,110,92,0.12)",
        "teal-ring": "0 0 0 3px #0F6E5C, 0 0 0 6px rgba(15,110,92,0.2)",
      },
      keyframes: {
        flowPacket: {
          "0%": { left: "0%", opacity: "0" },
          "5%": { opacity: "1" },
          "95%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
        nodeGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(15,110,92,0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(15,110,92,0.25)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.18)", opacity: "0" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        packetMove: {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "flow-packet": "flowPacket 2.4s linear infinite",
        "node-glow": "nodeGlow 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.4s ease-out both",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        "slide-in": "slideIn 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

