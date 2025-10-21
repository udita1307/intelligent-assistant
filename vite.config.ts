import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from .env file
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This is the crucial part that makes the API key available in your app
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    }
  }
})
