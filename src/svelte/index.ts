import MathEquation from './MathEquation.svelte';
import type { MathOptions } from '../core/types';

// Export interface with Svelte-specific name
export interface SvelteMathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

// Export the component with its original type
export default MathEquation;