import { equations } from '../types';
import { isValidEquation } from '../renderMaths';

describe('equations', () => {
    const equationKeys = [
        'quadratic',
        'einstein',
        'pythagorean',
        'euler',
        'circleArea',
        'normalDistribution',
        'derivative',
        'integral',
        'maxwellDivergenceE',
        'schrodinger',
    ] as const;

    it('contains all expected predefined equations', () => {
        equationKeys.forEach(key => {
            expect(equations).toHaveProperty(key);
        });
    });

    it('all equation values are non-empty strings', () => {
        equationKeys.forEach(key => {
            expect(typeof equations[key]).toBe('string');
            expect(equations[key].length).toBeGreaterThan(0);
        });
    });

    it('all predefined equations are valid LaTeX', () => {
        equationKeys.forEach(key => {
            expect(isValidEquation(equations[key])).toBe(true);
        });
    });

    it('quadratic formula contains expected LaTeX tokens', () => {
        expect(equations.quadratic).toContain('\\frac');
        expect(equations.quadratic).toContain('\\sqrt');
        expect(equations.quadratic).toContain('\\pm');
    });

    it('euler identity contains expected tokens', () => {
        expect(equations.euler).toContain('\\pi');
        expect(equations.euler).toContain('i');
    });

    it('schrodinger equation contains expected tokens', () => {
        expect(equations.schrodinger).toContain('\\hbar');
        expect(equations.schrodinger).toContain('\\Psi');
    });
});
