import katex from 'katex';
import type { MathOptions, MathError } from './types';

/**
 * Renders a LaTeX math equation to HTML string using KaTeX
 * 
 * @param options - The rendering options
 * @returns The rendered HTML string
 */
export function renderMath(options: MathOptions): { html: string; error: MathError } {
    const {
        equation,
        displayMode = false,
        katexOptions = {}
    } = options;

    const error: MathError = {
        hasError: false,
        message: '',
    };

    try {
        const html = katex.renderToString(equation, {
            throwOnError: false,
            errorColor: '#f44336',
            displayMode,
            output: 'html',
            ...katexOptions,
        });
        return { html, error };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknow error rendering equation';
        // Call the error callback if provided
        if (options.onError && err instanceof Error) {
            options.onError(err);
        }
        // Create an error message as HTML
        const html = `<span style="color: #f44336; border: 1px solid #f44336; padding: 2px 4px; border-radius: 4px; display: ${displayMode ? 'block' : 'inline-block'};">Error: ${message}</span>`;

        return {
            html,
            error: {
                hasError: true,
                message,
            }
        };
    }
}

/**
 * Checks if a string is a valid LaTeX equation
 * 
 * @param equation - The equation to validate
 * @returns Whether the equation is valid
 */
export function isValidEquation(equation: string): boolean {
    try {
        katex.renderToString(equation, { throwOnError: true });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Sanitizes an equation input to prevent code injection
 * 
 * @param equation - The input equation
 * @returns The sanitized equation
 */
export function sanitizeEquation(equation: string): string {
    return equation
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<\/?[^>]+(>|$)/g, '');
}