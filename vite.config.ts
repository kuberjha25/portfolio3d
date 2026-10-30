import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rolldownOptions: {
      output: {
        // Split big libraries into their own files so they download in
        // parallel and stay cached when only the site's own code changes.
        // three.js isn't listed: it's only used by lazy-loaded parts
        // (stars, earth), so it gets its own file automatically.
        codeSplitting: {
          groups: [
            {
              name: "react",
              priority: 20,
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
            },
            {
              name: "motion",
              priority: 10,
              test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
            },
          ],
        },
      },
    },
  },
});
