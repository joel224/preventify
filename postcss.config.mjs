/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Keeps Tailwind working
    autoprefixer: {}, // ADD THIS for cross-browser compatibility
  },
};

export default config;