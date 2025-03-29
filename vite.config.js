import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
      // Define entry points
      entry: {
        // Main package
        'index': resolve(__dirname, 'src/index.ts'),
        
        // React entry point 
        'react/index': resolve(__dirname, 'src/react/MathEquation.tsx'),
        
        // Svelte entry point
        'svelte/MathEquation.svelte': resolve(__dirname, 'src/svelte/MathEquation.svelte'),
        'svelte/index': resolve(__dirname, 'src/svelte/index.js'),
        
        // Vue entry point
        'vue/MathEquation.vue': resolve(__dirname, 'src/vue/MathEquation.vue'),
        'vue/index': resolve(__dirname, 'src/vue/index.js'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        // Handle special case for .svelte and .vue files
        if (entryName.endsWith('.svelte') || entryName.endsWith('.vue')) {
          return `${entryName}`;
        }
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