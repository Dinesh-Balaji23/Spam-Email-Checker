import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups", // ✅ Fix OAuth popup issue
      "Cross-Origin-Embedder-Policy": "require-corp", // ✅ Ensure proper embedding security
    },
  },
});
