import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Para GitHub Pages usa: npm run build
  // Para Hostinger usa: npm run build:hostinger
  const isGitHubPages = process.env.VITE_DEPLOY_TARGET === 'github';

  return {
    plugins: [react()],
    base: isGitHubPages ? '/BienestarFront/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})
