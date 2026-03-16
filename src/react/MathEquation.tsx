import React from "react";
import { renderMath } from "../core/renderMaths";
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
    const { html } = renderMath({
        equation,
        displayMode,
        katexOptions,
        onError,
    });

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
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default MathEquation;
