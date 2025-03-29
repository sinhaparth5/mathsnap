<script lang="ts">
  import { renderMath, sanitizeEquation } from "../core/renderMaths";
  import type { MathOptions } from "../core/types";
  import 'katex/dist/katex.min.css';

  // Component props
  export let equation: string;
  export let displayMode: boolean = false;
  export let className: string = '';
  export let style: string = '';
  export let katexOptions: MathOptions['katexOptions'] = {};
  export let as: 'span' | 'div' | 'p' = displayMode ? 'div' : 'span';

  // Internal state
  let htmlContent: string = '';
  let errorMessage: string = '';
  let hasError: boolean = false;
  
  // Handler for errors
  function handleError(error: Error) {
      errorMessage = error.message;
      hasError = true;
  }
  
  // Update the rendered equation when props change
  $: {
      // Sanitize the equation
      const cleanEquation = sanitizeEquation(equation);
      
      // Generate the HTML
      const result = renderMath({
      equation: cleanEquation,
      displayMode,
      katexOptions,
      onError: handleError
      });
      
      htmlContent = result.html;
      hasError = result.error.hasError;
      errorMessage = result.error.message;
  }
  
  // Computed styles for responsiveness
  $: containerStyle = `
      max-width: 100%;
      overflow-x: auto;
      display: ${displayMode ? 'block' : 'inline-block'};
      ${style}
  `;
</script>
<!-- Dynamic container based on 'as' prop -->
{#if as === 'div'}
<div 
  class="mathsnap-equation {displayMode ? 'mathsnap-display' : 'mathsnap-inline'} {className}"
  style={containerStyle}
>
  {@html htmlContent}
</div>
{:else if as === 'p'}
<p 
  class="mathsnap-equation {displayMode ? 'mathsnap-display' : 'mathsnap-inline'} {className}"
  style={containerStyle}
>
  {@html htmlContent}
</p>
{:else}
<span 
  class="mathsnap-equation {displayMode ? 'mathsnap-display' : 'mathsnap-inline'} {className}"
  style={containerStyle}
>
  {@html htmlContent}
</span>
{/if}

<style>
.mathsnap-display {
  margin: 1em 0;
}
</style>