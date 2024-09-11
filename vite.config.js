import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    // Laravel'de bazı kütüphaneler process.env'e ihtiyaç duymadığı için boş bir obje atanmış
    define: {
        'process.env': {},
    },
    plugins: [
        // Laravel Vite Plugin
        laravel({
            // Laravel giriş dosyaları. Birden fazla girdi de verebilirsiniz
            input: 'resources/js/app.js',
            // Eğer SSR kullanıyorsanız bu kısım kalabilir, aksi takdirde kaldırabilirsiniz.
            ssr: 'resources/js/ssr.js',
            refresh: true, // Hot Module Reloading (HMR)
        }),
        // Vue Plugin
        vue({
            template: {
                transformAssetUrls: {
                    base: null, // Varsayılan olarak /public'i kullan
                    includeAbsolute: false, // Absolut URL'ler dönüşüme dahil edilmez
                },
            },
        }),
    ],
});
