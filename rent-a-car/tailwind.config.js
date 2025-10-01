/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        "body-bg": "rgb(230, 230, 228)",
        "slate-900": "#0f172a",
        "orange-500": "#f97316",
        "orange-600": "#ea580c",
        "gray-300": "#d1d5db",
        "gray-400": "#9ca3af",
        "gray-500": "#6b7280",
        "gray-600": "#4b5563",
        "gray-800": "#1f2937",
        white: "#ffffff",
        black: "#000000",
      },
      backgroundColor: {
        body: "rgb(230, 230, 228)",
      },
    },
  },
  plugins: [],
};
