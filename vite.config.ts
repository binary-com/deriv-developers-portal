import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
//@ts-ignore
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy(),
        istanbul({
          cypress: true,
          requireEnv: false
        })
    ],
    build: {
        outDir: './_site',
    },
    server: {
        port: 3000
    }
});
