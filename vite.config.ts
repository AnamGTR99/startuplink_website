import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { instagramApiPlugin } from './instagram-api.plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), instagramApiPlugin(env.INSTAGRAM_ACCESS_TOKEN)],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
