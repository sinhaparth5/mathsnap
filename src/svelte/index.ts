
import MathEquation from './MathEquation.svelte';
import type { MathOptions } from '../core/types';

export interface SvelteMathEquationProps extends MathOptions {
  /**
   * Container tag to use
   * @default 'span' for inline, 'div' for displayMode
   */
  as?: 'span' | 'div' | 'p';
}

export default MathEquation;