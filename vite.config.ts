import { defineConfig } from 'vite';

// base './' so the build works from any portal sub-path (CrazyGames etc.)
export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 1500, target: 'es2020' },
});
