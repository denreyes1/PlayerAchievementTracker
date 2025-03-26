import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      filename: 'remoteEntry.js',
      exposes: {
        './Navbar': './src/components/Navbar.jsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
});