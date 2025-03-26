// Import CSS
import 'katex/dist/katex.min.css';
import { isValidEquation, renderMath, sanitizeEquation } from './core/renderMaths';
import { equations } from './core/types';

// Export core functionality
export { renderMath, isValidEquation, sanitizeEquation } from './core/renderMaths';
export { equations } from './core/types';
export type { MathOptions, MathError } from './core/types';

// Export React component
export { MathEquation as ReactMathEquation } from './react/MathEquation';
export type { MathEquationProps as ReactMathEquationProps } from './react/MathEquation';

// Note: The Svelte and Vue components are auto-imported by their respective bundlers
// when used, but we'll provide paths to make them easier to find

/**
 * Path to the Svelte component
 * 
 * Usage:
 * ```svelte
 * <script>
 *   import MathEquation from 'mathsnap/dist/svelte/MathEquation.svelte';
 * </script>
 * 
 * <MathEquation equation="E = mc^2" displayMode={true} />
 * ```
 */
export const SVELTE_COMPONENT_PATH = 'mathsnap/dist/svelte/MathEquation.svelte';

/**
 * Path to the Vue component
 * 
 * Usage:
 * ```vue
 * <script>
 *   import MathEquation from 'mathsnap/dist/vue/MathEquation.vue';
 *   
 *   export default {
 *     components: {
 *       MathEquation
 *     }
 *   }
 * </script>
 * 
 * <template>
 *   <MathEquation equation="E = mc^2" :displayMode="true" />
 * </template>
 * ```
 */
export const VUE_COMPONENT_PATH = 'mathsnap/dist/vue/MathEquation.vue';

// Default export for easier importing
export default {
  renderMath,
  isValidEquation,
  sanitizeEquation,
  equations,
  ReactMathEquation: require('./react/MathEquation').MathEquation,
  SVELTE_COMPONENT_PATH,
  VUE_COMPONENT_PATH
};