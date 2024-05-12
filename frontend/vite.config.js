import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.BASEURL': JSON.stringify(process.env.BASEURL || 'http://localhost:8080'),
  },
});
