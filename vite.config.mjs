import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const apiUrl = mode === 'development' ? 'http://127.0.0.1:3000' : '';

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
    test: {
      include: ['**/**/**/data-ent*/*.test.jsx', '**/**/**/button/*.test.jsx'],
      environment: 'jsdom',
      setupFiles: './vite-setup-file.js',
      globals: true, // needed for jest-dom to work
    },
  };
});
