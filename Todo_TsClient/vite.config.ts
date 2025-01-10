import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
// @ts-ignore
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

interface HandlebarsDataOptions {
    [key: string]: {title: string};
}

const handlebarsPageData: HandlebarsDataOptions = {
    '/index.html': {
        title: 'Home'
    },
}

export default defineConfig({
    plugins: [handlebars({
        reloadOnPartialChange: true,
        partialDirectory: resolve(__dirname, 'partials'),
        context(pagePath: string) {
            return handlebarsPageData[pagePath]
        }
    })],
    build: {
        outDir: './build',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin/index.html'),
                login: resolve(__dirname, 'login/index.html'),
                register: resolve(__dirname, 'register/index.html'),
                dashboard: resolve(__dirname, 'dashboard/index.html'),
                trash: resolve(__dirname, 'trash/index.html'),
                settings: resolve(__dirname, 'settings/index.html')
            }
        }
    },
    server: {
        port: 8080,
        host: '127.0.0.1',
    },
    css: {
        postcss: {
            plugins: [autoprefixer]
        },
        modules: {
            exportGlobals: true,
            localsConvention: 'camelCaseOnly',
        }
    }
})