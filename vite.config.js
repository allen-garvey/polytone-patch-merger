import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteSingleFile from './vite-plugin-singlefile/index.ts';

export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    plugins: [vue(), viteSingleFile()],
});
