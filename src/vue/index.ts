import MathEquation from './MathEquation.vue';
import type { MathOptions } from '../core/types';

export interface VueMathEquationProps extends MathOptions {
  as?: 'span' | 'div' | 'p';
}

export { MathEquation };
export default MathEquation;