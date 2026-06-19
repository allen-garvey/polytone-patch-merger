import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    plugins: [vue()],
});
