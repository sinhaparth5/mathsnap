import MathEquation from './MathEquation.svelte';
import type { MathOptions } from '../core/types';

export interface SvelteMathEquationProps extends MathOptions {
  as?: 'span' | 'div' | 'p';
  onError?: (error: Error) => void;
}

export { MathEquation };
export default MathEquation;