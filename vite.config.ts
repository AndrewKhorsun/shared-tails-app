import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: '/shared-tails-app/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://192.168.0.101:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
