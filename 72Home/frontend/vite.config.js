import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permette l'accesso dall'esterno del container
    port: 5173,
    watch: {
      usePolling: true, // Necessario per l'hot reload su Windows/Docker
    },
    hmr: {
      host: 'localhost', // Host per Hot Module Replacement
      clientPort: 5173, // Porta per il client HMR
    },
  },
})
