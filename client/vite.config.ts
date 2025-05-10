import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()], // Add the plugin here
  server: {
    port: 5173, // Default Vite port
    // Optional: Proxy API requests to the backend
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // Assuming backend runs on 3000
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api'), // Keep the /api prefix
    //   },
    // },
  },
});
