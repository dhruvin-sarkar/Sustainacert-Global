import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/utils": path.resolve(__dirname, "./src/lib"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/data": path.resolve(__dirname, "./src/data"),
    },
  },
});
