import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removePath(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log(`Removed ${path.relative(__dirname, targetPath)}`);
  }
}

function writeFile(targetPath, contents) {
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, contents);
  console.log(`Wrote ${path.relative(__dirname, targetPath)}`);
}

function copyFile(sourcePath, targetPath) {
  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied ${path.relative(__dirname, sourcePath)} -> ${path.relative(__dirname, targetPath)}`);
}

function pruneDistArtifacts() {
  console.log('Pruning duplicate and internal build artifacts...');

  const pathsToRemove = [
    path.join(distDir, 'node_modules'),
    path.join(distDir, '_virtual'),
    path.join(distDir, 'core', '__tests__'),
    path.join(distDir, 'vue', 'MathEquation.vue2.cjs'),
    path.join(distDir, 'vue', 'MathEquation.vue2.cjs.map'),
    path.join(distDir, 'vue', 'MathEquation.vue2.mjs'),
    path.join(distDir, 'vue', 'MathEquation.vue2.mjs.map'),
    path.join(distDir, 'vue', 'MathEquation.vue.js'),
    path.join(distDir, 'vue', 'MathEquation.vue.js.map'),
    path.join(distDir, 'vue', 'MathEquation.vue2.js'),
    path.join(distDir, 'vue', 'MathEquation.vue2.js.map'),
    path.join(distDir, 'svelte', 'MathEquation.svelte.js'),
    path.join(distDir, 'svelte', 'MathEquation.svelte.js.map'),
  ];

  pathsToRemove.forEach(removePath);
}

// Run the Vite build
console.log('Running Vite build...');
try {
  execFileSync(path.join(__dirname, 'node_modules', '.bin', 'vite'), ['build'], {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('Error during Vite build:', error);
  process.exit(1);
}

// Create necessary directories
console.log('Setting up directories...');
const dirs = ['dist/svelte', 'dist/vue', 'dist/react'];
dirs.forEach(dir => {
  ensureDir(path.join(__dirname, dir));
});

// Copy Svelte and Vue components DIRECTLY without processing
console.log('Copying framework component files...');

// Svelte component - with content preservation
const svelteSrc = path.join(__dirname, 'src/svelte/MathEquation.svelte');
const svelteDest = path.join(__dirname, 'dist/svelte/MathEquation.svelte');
copyFile(svelteSrc, svelteDest);

// Vue component - with content preservation
const vueSrc = path.join(__dirname, 'src/vue/MathEquation.vue');
const vueDest = path.join(__dirname, 'dist/vue/MathEquation.vue');
copyFile(vueSrc, vueDest);

pruneDistArtifacts();

// Copy KaTeX CSS and fonts directly (avoids Vite font-inlining which inflates size 60x)
console.log('Copying KaTeX CSS and fonts...');
const katexDistSrc = path.join(__dirname, 'node_modules/katex/dist');
const katexCssSrc  = path.join(katexDistSrc, 'katex.min.css');
const katexCssDest = path.join(distDir, 'mathsnap.min.css');
const fontsSrc     = path.join(katexDistSrc, 'fonts');
const fontsDest    = path.join(distDir, 'fonts');

copyFile(katexCssSrc, katexCssDest);

// Copy fonts directory recursively
if (fs.existsSync(fontsDest)) {
  fs.rmSync(fontsDest, { recursive: true });
}
fs.cpSync(fontsSrc, fontsDest, { recursive: true });
console.log(`Copied fonts/ -> dist/fonts/`);

// Remove the Vite-generated CSS (it has fonts baked in as base64 — we don't want it)
removePath(path.join(distDir, 'mathsnap.css'));

// Create declaration files
console.log('Creating declaration files...');

// Create Svelte index declaration file
writeFile(path.join(distDir, 'svelte/index.d.ts'),
`import type { Component } from 'svelte';
import type { MathOptions } from '../core/types';

export interface SvelteMathEquationProps extends MathOptions {
  as?: 'span' | 'div' | 'p';
  onError?: (error: Error) => void;
}

declare const MathEquation: Component<SvelteMathEquationProps>;
export { MathEquation };
export default MathEquation;
`);

// Create Svelte component declaration file
writeFile(path.join(distDir, 'svelte/MathEquation.svelte.d.ts'),
`import type { Component } from 'svelte';
import type { MathOptions } from '../core/types';

export interface MathEquationProps extends MathOptions {
  as?: 'span' | 'div' | 'p';
  onError?: (error: Error) => void;
}

declare const MathEquation: Component<MathEquationProps>;
export { MathEquation };
export default MathEquation;
`);

// Create Vue index declaration file
writeFile(path.join(distDir, 'vue/index.d.ts'), 
`import MathEquation from './MathEquation.vue';
import type { MathOptions } from '../core/types';

export interface VueMathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

export { MathEquation };
export default MathEquation;
`);

// Create Vue component declaration file
writeFile(path.join(distDir, 'vue/MathEquation.vue.d.ts'), 
`import { DefineComponent } from 'vue';
import type { MathOptions } from '../core/types';

export interface MathEquationProps extends MathOptions {
  as?: 'span' | 'div' | 'p';
}

declare const MathEquation: DefineComponent<MathEquationProps>;
export { MathEquation };
export default MathEquation;
`);

console.log('Build completed successfully!');
