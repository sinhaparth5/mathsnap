import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Cleaning dist directory...');
try {
  execSync('npm run clean', { stdio: 'inherit' });
} catch (error) {
  console.error('Error cleaning dist directory:', error);
}

// Run the Vite build
console.log('Running Vite build...');
try {
  execSync('vite build', { stdio: 'inherit' });
} catch (error) {
  console.error('Error during Vite build:', error);
  process.exit(1);
}

// Create necessary directories
console.log('Setting up directories...');
const dirs = ['dist/svelte', 'dist/vue', 'dist/react'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy Svelte and Vue components DIRECTLY without processing
console.log('Copying framework component files...');

// Svelte component - with content preservation
const svelteSrc = path.join(__dirname, 'src/svelte/MathEquation.svelte');
const svelteDest = path.join(__dirname, 'dist/svelte/MathEquation.svelte');
fs.copyFileSync(svelteSrc, svelteDest);
console.log(`Copied ${svelteSrc} -> ${svelteDest}`);

// Vue component - with content preservation
const vueSrc = path.join(__dirname, 'src/vue/MathEquation.vue');
const vueDest = path.join(__dirname, 'dist/vue/MathEquation.vue');
fs.copyFileSync(vueSrc, vueDest);
console.log(`Copied ${vueSrc} -> ${vueDest}`);

// Remove any bundled node_modules
console.log('Cleaning up node_modules from dist...');
try {
  execSync('rm -rf dist/node_modules', { stdio: 'inherit' });
} catch (error) {
  console.error('Error cleaning node_modules:', error);
}

// Remove duplicate files
console.log('Cleaning up duplicate files...');
const filesToRemove = [
  'dist/vue/MathEquation.vue.js',
  'dist/vue/MathEquation.vue.mjs',
  'dist/vue/MathEquation.vue.js.map',
  'dist/vue/MathEquation.vue.mjs.map',
  'dist/vue/MathEquation.vue2.js',
  'dist/vue/MathEquation.vue2.mjs',
  'dist/vue/MathEquation.vue2.js.map',
  'dist/vue/MathEquation.vue2.mjs.map',
  'dist/svelte/MathEquation.svelte.js',
  'dist/svelte/MathEquation.svelte.mjs',
  'dist/svelte/MathEquation.svelte.js.map',
  'dist/svelte/MathEquation.svelte.mjs.map',
];

filesToRemove.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed ${filePath}`);
  }
});

// Create declaration files
console.log('Creating declaration files...');

// Create Svelte index declaration file
fs.writeFileSync(path.join(__dirname, 'dist/svelte/index.d.ts'), 
`import MathEquation from './MathEquation.svelte';
import type { MathOptions } from '../core/types';

export interface SvelteMathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

export default MathEquation;
`);

// Create Svelte component declaration file
fs.writeFileSync(path.join(__dirname, 'dist/svelte/MathEquation.svelte.d.ts'), 
`import { SvelteComponent } from 'svelte';
import type { MathOptions } from '../core/types';

export interface MathEquationProps extends MathOptions {
  as?: 'span' | 'div' | 'p';
}

export default class MathEquation extends SvelteComponent<MathEquationProps> {}
`);

// Create Vue index declaration file
fs.writeFileSync(path.join(__dirname, 'dist/vue/index.d.ts'), 
`import MathEquation from './MathEquation.vue';
import type { MathOptions } from '../core/types';

export interface VueMathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

export default MathEquation;
`);

// Create Vue component declaration file
fs.writeFileSync(path.join(__dirname, 'dist/vue/MathEquation.vue.d.ts'), 
`import { DefineComponent } from 'vue';
import type { MathOptions } from '../core/types';

export interface MathEquationProps extends MathOptions {
  as?: 'span' | 'div' | 'p';
}

declare const MathEquation: DefineComponent<MathEquationProps>;
export default MathEquation;
`);

console.log('Build completed successfully!');