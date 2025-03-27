// This script copies Svelte and Vue components to their respective directories
// and creates type declaration files for them

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create necessary directories if they don't exist
const dirs = ['dist/svelte', 'dist/vue'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// COPY THE ACTUAL COMPONENT FILES
console.log('Copying Svelte and Vue component files...');

// Copy the Svelte component
const svelteSrc = path.join(__dirname, 'src/svelte/MathEquation.svelte');
const svelteDest = path.join(__dirname, 'dist/svelte/MathEquation.svelte');
fs.copyFileSync(svelteSrc, svelteDest);
console.log(`Copied ${svelteSrc} -> ${svelteDest}`);

// Copy the Vue component
const vueSrc = path.join(__dirname, 'src/vue/MathEquation.vue');
const vueDest = path.join(__dirname, 'dist/vue/MathEquation.vue');
fs.copyFileSync(vueSrc, vueDest);
console.log(`Copied ${vueSrc} -> ${vueDest}`);

// Create Svelte type declaration file
fs.writeFileSync(
  path.join(__dirname, 'dist/svelte/index.d.ts'),
  `import { SvelteComponent } from 'svelte';
import type { MathOptions } from '../core/types';

interface MathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

export default class MathEquation extends SvelteComponent<MathEquationProps> {}
`
);

// Create Vue type declaration file
fs.writeFileSync(
  path.join(__dirname, 'dist/vue/index.d.ts'),
  `import { DefineComponent } from 'vue';
import type { MathOptions } from '../core/types';

interface MathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

declare const MathEquation: DefineComponent<MathEquationProps>;
export default MathEquation;
`
);

// Create entry points for Svelte and Vue
// Update paths to reference the copied files in dist
fs.writeFileSync(
  path.join(__dirname, 'dist/svelte/index.mjs'),
  `import MathEquation from './MathEquation.svelte';
export default MathEquation;
`
);

fs.writeFileSync(
  path.join(__dirname, 'dist/svelte/index.cjs'),
  `module.exports = require('./MathEquation.svelte');
`
);

fs.writeFileSync(
  path.join(__dirname, 'dist/vue/index.mjs'),
  `import MathEquation from './MathEquation.vue';
export default MathEquation;
`
);

fs.writeFileSync(
  path.join(__dirname, 'dist/vue/index.cjs'),
  `module.exports = require('./MathEquation.vue');
`
);

console.log('✓ Type declarations and entry points for Svelte and Vue components created');