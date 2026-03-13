import React, { useEffect, useRef, useState } from "react";
import { renderMath, sanitizeEquation } from "../core/renderMaths";
import type { MathOptions } from "../core/types";

export interface ReactMathEquationProps extends Omit<MathOptions, 'style'> {
    style?: React.CSSProperties;
    as?: 'span' | 'div' | 'p';
}

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
    // Keep onError in a ref so it never causes re-renders
    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;

    useEffect(() => {
        const cleanEquation = sanitizeEquation(equation);
        const { html } = renderMath({
            equation: cleanEquation,
            displayMode,
            katexOptions,
            onError: onErrorRef.current,
        });
        setHtmlContent(html);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [equation, displayMode, JSON.stringify(katexOptions)]);

    const Container = as || (displayMode ? 'div' : 'span');

    const responsiveStyle: React.CSSProperties = {
        ...style,
        maxWidth: '100%',
        overflowX: 'auto',
        display: displayMode ? 'block' : 'inline-block',
    };

    return (
        <Container
            className={`mathsnap-equation ${displayMode ? 'mathsnap-display' : 'mathsnap-inline'} ${className}`}
            style={responsiveStyle}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default MathEquation;
