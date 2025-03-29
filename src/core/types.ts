import type { KatexOptions } from "katex";
import type { CSSProperties } from "react";

/**
 * Basic options for rendering math equations with mathsnap
 */
export interface MathOptions {
    /** The LaTeX equation to render */
    equation: string;

    /** Whether to render in display mode (centered, block) or inline mode */
    displayMode?: boolean;

    /** Custom class name to add to the math container */
    className?: string;

    /** Custom inline styles for the container */
    style?: CSSProperties;

    /** Error callback when rendering fails */
    onError?: (error: Error) => void;

    /** Additional KaTeX options */
    katexOptions?: Omit<KatexOptions, 'displayMode' | 'throwOnError' | 'output'>;
}

/**
 * Predefined equations that can be used with mathsnap
 */
export const equations = {
    /** Quadratic formula */
    quadratic: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    
    /** Einstein's mass-energy equivalence */
    einstein: 'E = mc^2',
    
    /** Pythagorean theorem */
    pythagorean: 'a^2 + b^2 = c^2',
    
    /** Euler's identity */
    euler: 'e^{i\\pi} + 1 = 0',
    
    /** Area of a circle */
    circleArea: 'A = \\pi r^2',
    
    /** Normal distribution */
    normalDistribution: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}',
    
    /** Derivative definition */
    derivative: '\\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
    
    /** Integral definition */
    integral: '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)',
    
    /** Maxwell's equations (divergence of E) */
    maxwellDivergenceE: '\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}', 
    
    /** Schrödinger equation */
    schrodinger: 'i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\vec{r},t) = \\hat{H}\\Psi(\\vec{r},t)',
}

/** Error state for math rendering */
export interface MathError {
    hasError: boolean;
    message: string;
}