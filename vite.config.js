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
      exclude: ['src/**/*.svelte', 'src/**/*.vue', 'node_modules/**/*'],
      rollupTypes: true,
    }),
    // Framework plugins
    react({
      babel: {
        presets: ['@babel/preset-typescript']
      },
      jsxRuntime: 'automatic'
    }),
    svelte({
      // Use updated Svelte compiler options
      compilerOptions: {
        dev: false,
        css: 'external' // Fixed: use string value instead of boolean
      },
      emitCss: false
    }),
    vue(),
  ],
  build: {
    lib: {
      entry: {
        // Main package
        'index': resolve(__dirname, 'src/index.ts'),
        
        // Framework entry points - DO NOT include actual components
        'react/index': resolve(__dirname, 'src/react/index.ts'),
        'svelte/index': resolve(__dirname, 'src/svelte/index.ts'),
        'vue/index': resolve(__dirname, 'src/vue/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        return `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`;
      }
    },
    rollupOptions: {
      // CRITICAL: Mark ALL framework code as external
      external: [
        'react', 
        'react-dom', 
        'svelte', 
        'vue', 
        'katex',
        /^svelte\/.*$/,  // Important: exclude ALL svelte internal imports
        /^vue\/.*$/      // Important: exclude ALL vue internal imports
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        // Important: Do not bundle node_modules
        hoistTransitiveImports: false,
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
  optimizeDeps: {
    exclude: ['svelte', 'vue', 'react', 'react-dom']
  },
  esbuild: {
    loader: 'tsx',
    target: 'es2020',
    keepNames: false
  }
});