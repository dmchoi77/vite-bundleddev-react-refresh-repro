import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  experimental: {
    bundledDev: true,
  },
  plugins: [react()],
});
