import { renderMath, isValidEquation, sanitizeEquation } from './core/renderMaths';
import { equations } from './core/types';

export { renderMath, isValidEquation, sanitizeEquation, equations };
export type { MathOptions, MathError } from './core/types';

export const mathsnap = {
  renderMath,
  isValidEquation,
  sanitizeEquation,
  equations,
};
