import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import sass from 'vite-plugin-sass';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    base: './',
    build: {
        sourcemap: true,
        assetsDir: 'assets',
        target: ['esnext', 'edge100', 'firefox100', 'chrome100', 'safari18'],
    },
    plugins: [
        sass(),
        react(),
        VitePWA({
            strategies: 'injectManifest',
            injectManifest: {
                swSrc: 'public/sw.js',
                swDest: 'dist/sw.js',
                globDirectory: 'dist',
                globPatterns: ['**/*.{html,js,css,json,PNG}'],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    resolve: {
        alias: {
            '@': `${__dirname}/src`,
        },
    },
});
