import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    // Generate TypeScript declaration files
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.svelte', 'src/**/*.vue'],
    }),
    // Framework plugins
    react(),
    svelte(),
    vue(),
  ],
  // External dependencies that shouldn't be bundled
  build: {
    lib: {
      entry: {
        index: resolve('src/index.ts'),
        'react/index': resolve('src/react/MathEquation.tsx'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        return `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`;
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'svelte', 'vue', 'katex'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        // Provide global names for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          svelte: 'Svelte',
          vue: 'Vue',
          katex: 'katex'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  // Handle Svelte and Vue files separately
  optimizeDeps: {
    exclude: ['svelte', 'vue']
  },
});