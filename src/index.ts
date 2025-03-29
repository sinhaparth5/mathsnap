import 'katex/dist/katex.min.css';

// Import functions for re-export
import { renderMath, isValidEquation, sanitizeEquation } from './core/renderMaths';
import { equations } from './core/types';

// Export core functionality
export { renderMath, isValidEquation, sanitizeEquation } from './core/renderMaths';
export { equations } from './core/types';
export type { MathOptions, MathError } from './core/types';

// Export React component
export { MathEquation as ReactMathEquation } from './react/MathEquation';
export type { ReactMathEquationProps } from './react/MathEquation';

// Export utility object
export const mathsnap = {
  renderMath,
  isValidEquation,
  sanitizeEquation,
  equations
};