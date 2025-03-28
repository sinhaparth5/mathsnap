import React, { useEffect, useState } from "react";
import { renderMath, sanitizeEquation } from "../core/renderMaths";
import type { MathOptions } from "../core/types";
import 'katex/dist/katex.min.css';

// Use a React-specific name to avoid type conflicts
export interface ReactMathEquationProps extends Omit<MathOptions, 'style'> {
    /**
     * React-specific style prop
     */
    style?: React.CSSProperties;

    /**
     * Container tag to use
     * @default 'span' for inline, 'div' for displayMode
     */
    as?: 'span' | 'div' | 'p';
}

/**
 * React component for rendering mathematical equations
 */
export const MathEquation: React.FC<ReactMathEquationProps> = ({
    equation,
    displayMode = false,
    className = '',
    style = {},
    katexOptions = {},
    onError,
    as
}) => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    
    useEffect(() => {
        // Sanitize the equation first
        const cleanEquation = sanitizeEquation(equation);
        
        // Generate the HTML
        const { html } = renderMath({
            equation: cleanEquation,
            displayMode,
            katexOptions,
            onError
        });
        
        setHtmlContent(html);
    }, [equation, displayMode, katexOptions, onError]);
    
    // Determine the container element
    const Container = as || (displayMode ? 'div' : 'span');
    
    // Responsive styles
    const responsiveStyle: React.CSSProperties = {
        ...style,
        maxWidth: '100%',
        overflowX: 'auto',
        display: displayMode ? 'block' : 'inline-block'
    };

    return (
        <Container
            className={`mathsnap-equation ${displayMode ? 'mathsnap-display' : 'mathsnap-inline'} ${className}`}
            style={responsiveStyle}
            dangerouslySetInnerHTML={{__html: htmlContent}}
        />
    );
};

// Default export for easier importing
export default MathEquation;