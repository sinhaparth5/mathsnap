import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/browser.ts'),
      name: 'MathSnap',
      formats: ['es', 'iife'],
      fileName: (format) => `browser/mathsnap.${format === 'es' ? 'esm' : 'min'}.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    minify: 'esbuild',
  },
  esbuild: {
    target: 'es2020',
    keepNames: false,
  },
});
