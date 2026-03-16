<script lang="ts">
  import { renderMath } from "../core/renderMaths";
  import type { MathOptions } from "../core/types";

  interface Props {
    equation: string;
    displayMode?: boolean;
    className?: string;
    style?: string;
    katexOptions?: MathOptions['katexOptions'];
    as?: 'span' | 'div' | 'p';
    onError?: (error: Error) => void;
  }

  let {
    equation,
    displayMode = false,
    className = '',
    style = '',
    katexOptions = {},
    as,
    onError,
  }: Props = $props();

  const renderResult = $derived(
    renderMath({
      equation,
      displayMode,
      katexOptions,
      onError,
    })
  );

  const htmlContent = $derived(renderResult.html);

  const containerEl = $derived(as ?? (displayMode ? 'div' : 'span'));
  const containerStyle = $derived(
    `max-width: 100%; overflow-x: auto; display: ${displayMode ? 'block' : 'inline-block'}; ${style}`
  );
</script>

{#if containerEl === 'div'}
  <div
    class="mathsnap-equation {displayMode ? 'mathsnap-display' : 'mathsnap-inline'} {className}"
    style={containerStyle}
  >
    {@html htmlContent}
  </div>
{:else if containerEl === 'p'}
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
