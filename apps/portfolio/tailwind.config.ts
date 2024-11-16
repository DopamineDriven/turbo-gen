import type { Config as TailwindConfig } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const customGrays = {
  "1000": "#111113",
  "1100": "#0a0a0b",
  "50": "#fafafa",
  "100": "#f4f4f5",
  "200": "#e4e4e7",
  "300": "#d4d4d8",
  "400": "#a1a1aa",
  "500": "#71717a",
  "600": "#52525b",
  "700": "#3f3f46",
  "800": "#27272a",
  "900": "#18181b",
  "950": "#09090b"
} as const;

// screens: {
//   xs: "375px",
//   smxs: "507px",
//   sm: "640px",
//   md: "768px",
//   mdlg: "896px",
//   lg: "1024px",
//   xl: "1280px",
//   "2xl": "1536px"
// },

const config = {
  content: ["src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: ["class", 'html[class~="dark"]'],
  darkMode: ["class", "class"],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        "basis-grotesque-pro-regular": [
          "var(--font-basis-grotesque-pro-regular)"
        ],
        "basis-grotesque-pro-italic": [
          "var(--font-basis-grotesque-pro-italic)"
        ],
        "basis-grotesque-pro-black": ["var(--font-basis-grotesque-pro-black)"],
        "basis-grotesque-pro-black-italic": [
          "var(--font-basis-grotesque-pro-black-italic)"
        ],
        "basis-grotesque-pro-bold": ["var(--font-basis-grotesque-pro-bold)"],
        "basis-grotesque-pro-bold-italic": [
          "var(--font-basis-grotesque-pro-bold-italic)"
        ],
        "basis-grotesque-pro-light": ["var(--font-basis-grotesque-pro-light)"],
        "basis-grotesque-pro-light-italic": [
          "var(--font-basis-grotesque-pro-light-italic)"
        ],
        "basis-grotesque-pro-medium": [
          "var(--font-basis-grotesque-pro-medium)"
        ],
        "basis-grotesque-pro-medium-italic": [
          "var(--font-basis-grotesque-pro-medium-italic)"
        ]
      },
      fontSize: {
        xxs: ["0.5rem", { lineHeight: "0.75rem" }]
      },
      colors: {
        gray: customGrays,
        flirt: {
          "50": "#FFF0FD",
          "100": "#FFE3FC",
          "200": "#FFC7FA",
          "300": "#FF9AF3",
          "400": "#FF5CE8",
          "500": "#FF2CD8",
          "600": "#FA08BD",
          "700": "#DA009A",
          "800": "#AC0079",
          "900": "#95066A",
          "950": "#5D003D"
        },
        banner: {
          "50": "#F7F7F8",
          "100": "#EEEEF0",
          "200": "#D9D9DE",
          "300": "#B9BAC0",
          "400": "#92939E",
          "500": "#757682",
          "600": "#5E5E6B",
          "700": "#4D4D57",
          "800": "#42424A",
          "900": "#3A3A40",
          "950": "#131315"
        },
        "stone-mist": {
          "50": "#F6F6F7",
          "100": "#EEEFF1",
          "200": "#E1E1E4",
          "300": "#CECFD3",
          "400": "#B9B9C0",
          "500": "#A5A6AF",
          "600": "#9797A1",
          "700": "#7C7C86",
          "800": "#66666D",
          "900": "#55555A",
          "950": "#323135"
        },
        dcs: {
          "50": "#f3f6fc",
          "100": "#e6edf8",
          "200": "#c8daef",
          "300": "#98bce1",
          "400": "#6098d0",
          "500": "#3c7bbb",
          "600": "#2b609e",
          "700": "#244d80",
          "800": "#234670",
          "900": "#203a5a",
          "950": "#16253b"
        }
      },
      ringWidth: {
        "3": "3px",
        "5": "5px",
        "6": "6px",
        "7": "7px"
      },
      maxWidth: {
        "10xl": "173.75rem",
        "9xl": "121rem",
        "8xl": "96rem"
      },
      width: {
        "9xl": "120rem",
        "8xl": "96rem"
      },
      dropShadow: {
        testimonial: "1px 1px 5px 0px rgba(0, 0, 0, 0.84)"
      },
      boxShadow: {
        glow: "0 0 4px rgb(0 0 0 / 0.1)",
        refinement: "0px 2px 5px 0px #d7d7d7",
        testimonial: "5px 5px 5px 0px rgba(0, 0, 0, 0.35)",
        titleShadow: "0 1px 0 0 rgb(35 38 59 / 5%)",
        embla: "inset 0 0 0 0.2rem rgb(54 49 61 / 1)",
        magical:
          "rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px",
        cardHover:
          "0 4px 4.1px rgba(0, 0, 0, 0.012),0 4.9px 5.8px rgba(0, 0, 0, 0.018),0 6.3px 8.4px rgba(0, 0, 0, 0.029),0 8.8px 12.9px rgba(0, 0, 0, 0.05),0 15px 23px rgba(0, 0, 0, 0.11)",
        activeShadow:
          "inset 0 1px 4px 0 rgb(119 122 175 / 40%), inset 0 1px 1px 0 rgb(119 122 175 / 40%), 0 1px 0 0 rgb(35 38 59 / 5%)"
      },
      keyframes: ({ theme: _theme }) => ({
        blink: {
          "0%": {
            opacity: "0.2"
          },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.2" }
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        loading: {
          "0%": { opacity: ".2" },
          "20%": { opacity: "1", transform: "translateX(1px)" },
          to: { opacity: ".2" }
        },
        wave: {
          "0%, 100%": { transform: "rotate(0)" },
          "20%, 60%": { transform: "rotate(-25deg)" },
          "40%, 80%": { transform: "rotate(10deg)" }
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        translateXReset: { "100%": { transform: "translateX(0)" } },
        fadeToTransparent: {
          "0%": { opacity: "1" },
          "40%": { opacity: "1" },
          "100%": { opacity: "0" }
        }
      }),
      transitionDelay: {
        "400": "400ms"
      },
      animation: {
        wiggle: "wiggle 10s ease-in-out infinite",
        hero: "hero 1s ease-in-out infinite",
        slowPing: "pulse 10s cubic-bezier(0, 0, 0.2, 1) infinite",
        slowWave: "wave 10s ease-in-out",
        wave: "wave 560ms ease-in-out",
        blink: "blink 1.4s ease-in-out infinite"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    forms,
    require("@headlessui/tailwindcss"),
    typography,
    require("@xpd/tailwind-3dtransforms")
  ]
} satisfies TailwindConfig;
export default config;
