import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F1",
        "cream-tinted": "#F2EBE1",
        sand: "#E0D5C5",
        walnut: "#3D2F2A",
        "warm-gray": "#7A6B63",
        terracotta: "#C07252",
        olive: "#6B7F5E",
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
