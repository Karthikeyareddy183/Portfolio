import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' + hash routing → the build works from any sub-path
// (GitHub Pages project sites, Vercel, Netlify) with no rewrite rules.
export default defineConfig({
  plugins: [react()],
  base: './',
});
