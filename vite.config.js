import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// configuração do Vite
export default defineConfig({
  plugins: [react()],

  // necessário para publicar no GitHub Pages
  // se o repo for buildercv
  base: '/buildercv/',

  server: {
    port: 5173,
    open: true
  }
})