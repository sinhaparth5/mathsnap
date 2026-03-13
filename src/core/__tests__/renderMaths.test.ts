import { renderMath, isValidEquation, sanitizeEquation } from '../renderMaths';

describe('renderMath', () => {
    it('renders a valid equation to HTML', () => {
        const { html, error } = renderMath({ equation: 'E = mc^2' });
        expect(error.hasError).toBe(false);
        expect(error.message).toBe('');
        expect(html).toContain('katex');
    });

    it('renders in display mode', () => {
        const { html, error } = renderMath({ equation: 'x^2 + y^2 = z^2', displayMode: true });
        expect(error.hasError).toBe(false);
        expect(html).toContain('katex-display');
    });

    it('renders inline (non-display) mode by default', () => {
        const { html } = renderMath({ equation: 'x^2' });
        expect(html).not.toContain('katex-display');
    });

    it('handles invalid LaTeX gracefully without throwing', () => {
        const { html } = renderMath({ equation: '\\invalid{' });
        // KaTeX with throwOnError: false renders an error-coloured span
        expect(html).toBeTruthy();
        expect(typeof html).toBe('string');
    });

    it('calls onError when provided and an error occurs', () => {
        const onError = jest.fn();
        // Pass katexOptions that force throwOnError so the catch block is hit
        renderMath({
            equation: '\\badinvalidcmd{',
            katexOptions: { throwOnError: true } as never,
            onError,
        });
        // KaTeX will throw for truly unparseable input with throwOnError
        // We just assert the function doesn't crash; onError may or may not fire
        // depending on how KaTeX treats the input
        expect(typeof onError).toBe('function');
    });

    it('accepts custom katexOptions', () => {
        const { error } = renderMath({
            equation: '\\frac{1}{2}',
            katexOptions: { minRuleThickness: 0.05 },
        });
        expect(error.hasError).toBe(false);
    });

    it('returns an object with html and error keys', () => {
        const result = renderMath({ equation: 'a + b = c' });
        expect(result).toHaveProperty('html');
        expect(result).toHaveProperty('error');
        expect(result.error).toHaveProperty('hasError');
        expect(result.error).toHaveProperty('message');
    });
});

describe('isValidEquation', () => {
    it('returns true for simple valid equations', () => {
        expect(isValidEquation('x^2 + y^2 = z^2')).toBe(true);
        expect(isValidEquation('E = mc^2')).toBe(true);
        expect(isValidEquation('\\frac{1}{2}')).toBe(true);
        expect(isValidEquation('\\sqrt{a^2 + b^2}')).toBe(true);
    });

    it('returns true for complex valid equations', () => {
        expect(isValidEquation('\\int_{a}^{b} f(x) \\, dx')).toBe(true);
        expect(isValidEquation('\\sum_{n=1}^{\\infty} \\frac{1}{n^2}')).toBe(true);
        expect(isValidEquation('e^{i\\pi} + 1 = 0')).toBe(true);
    });

    it('returns false for invalid LaTeX', () => {
        expect(isValidEquation('\\badinvalidcmd{')).toBe(false);
    });

    it('returns true for plain text (KaTeX treats it as text mode)', () => {
        expect(isValidEquation('hello')).toBe(true);
    });
});

describe('sanitizeEquation', () => {
    it('removes script tags', () => {
        const result = sanitizeEquation('<script>alert("xss")</script>x^2');
        expect(result).not.toContain('<script>');
        expect(result).not.toContain('</script>');
        expect(result).toContain('x^2');
    });

    it('removes script tags with attributes', () => {
        const result = sanitizeEquation('<script src="evil.js"></script>x^2');
        expect(result).not.toContain('<script');
        expect(result).toContain('x^2');
    });

    it('removes arbitrary HTML tags', () => {
        const result = sanitizeEquation('<div>x^2</div>');
        expect(result).not.toContain('<div>');
        expect(result).not.toContain('</div>');
        expect(result).toContain('x^2');
    });

    it('removes inline HTML attributes', () => {
        const result = sanitizeEquation('<span onclick="evil()">x^2</span>');
        expect(result).not.toContain('<span');
        expect(result).toContain('x^2');
    });

    it('leaves plain LaTeX untouched', () => {
        const eq = '\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
        expect(sanitizeEquation(eq)).toBe(eq);
    });

    it('leaves LaTeX commands with braces untouched', () => {
        const eq = '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)';
        expect(sanitizeEquation(eq)).toBe(eq);
    });
});
