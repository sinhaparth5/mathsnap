// Import CSS
import 'katex/dist/katex.min.css';

// Export core functionality
export { renderMath, isValidEquation, sanitizeEquation } from './core/renderMaths';
export { equations } from './core/types';
export type { MathOptions, MathError } from './core/types';

// Export React component
export { MathEquation as ReactMathEquation } from './react/MathEquation';
export type { MathEquationProps as ReactMathEquationProps } from './react/MathEquation';

// Framework component paths
export const SVELTE_COMPONENT = 'mathsnap/svelte';
export const VUE_COMPONENT = 'mathsnap/vue';

// Create a utilities object instead of a default export
export const mathsnap = {
  renderMath,
  isValidEquation,
  sanitizeEquation,
  equations,
  SVELTE_COMPONENT,
  VUE_COMPONENT
};

// Import the functions needed to build the mathsnap object
import { renderMath, isValidEquation, sanitizeEquation } from './core/renderMaths';
import { equations } from './core/types';