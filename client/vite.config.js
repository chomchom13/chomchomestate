import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/server': { // this means each time we write '/api' , take it as the target that we defined below this
        target : 'http://localhost:3000',
        secure : false,
      }
    }
  }, 
  plugins: [react()],
})
