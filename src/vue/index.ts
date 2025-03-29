import MathEquation from './MathEquation.vue';
import type { MathOptions } from '../core/types';

// Export interface with Vue-specific name
export interface VueMathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

// Export the component with its original type
export default MathEquation;