# MathSnap

[![npm version](https://img.shields.io/npm/v/mathsnap.svg)](https://www.npmjs.com/package/mathsnap)
[![license](https://img.shields.io/npm/l/mathsnap.svg)](https://github.com/sinhaparth5/mathsnap/blob/master/LICENSE)

MathSnap is a lightweight, framework-agnostic wrapper around [KaTeX](https://katex.org/) that makes it easy to render beautiful math equations in your web applications. Works with React, Svelte, Vue, and vanilla JavaScript.

## Features

- 🧮 Simplified API for rendering LaTeX math equations
- ⚛️ Components for React, Svelte, and Vue
- 📱 Responsive by default
- 🎨 Customizable styling options
- 🔍 Built-in error handling
- 📦 Tiny footprint with KaTeX as the only dependency
- 📝 TypeScript support

## Installation

```bash
# npm
npm install mathsnap katex

# yarn
yarn add mathsnap katex

# pnpm
pnpm add mathsnap katex
```

## Quick Start

### React

```jsx
import { ReactMathEquation, equations } from 'mathsnap';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS

function App() {
  return (
    <div>
      <h1>Einstein's famous equation</h1>
      <ReactMathEquation equation={equations.einstein} displayMode={true} />
      
      <h2>Custom equation</h2>
      <ReactMathEquation equation="f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi" displayMode={true} />
    </div>
  );
}
```

### Svelte

```svelte
<script>
  import MathEquation from 'mathsnap/dist/svelte/MathEquation.svelte';
  import { equations } from 'mathsnap';
  import 'katex/dist/katex.min.css';
</script>

<h1>Quadratic Formula</h1>
<MathEquation equation={equations.quadratic} displayMode={true} />

<h2>Inline equation: <MathEquation equation="e^{i\\pi} + 1 = 0" /></h2>
```

### Vue

```vue
<template>
  <div>
    <h1>Area of a Circle</h1>
    <MathEquation :equation="equations.circleArea" :displayMode="true" />
    
    <h2>With custom styling</h2>
    <MathEquation 
      equation="\\nabla \\times \\vec{B} = \\mu_0 \\vec{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}"
      :displayMode="true"
      :style="{ fontSize: '1.5rem', backgroundColor: '#f5f5f5', padding: '1rem' }"
    />
  </div>
</template>

<script>
import MathEquation from 'mathsnap/dist/vue/MathEquation.vue';
import { equations } from 'mathsnap';
import 'katex/dist/katex.min.css';

export default {
  components: {
    MathEquation
  },
  setup() {
    return { equations };
  }
}
</script>
```

### Vanilla JavaScript

```js
import { renderMath, equations } from 'mathsnap';
import 'katex/dist/katex.min.css';

// Get the container element
const container = document.getElementById('math-container');

// Render the equation
const { html } = renderMath({
  equation: equations.schrodinger,
  displayMode: true
});

// Set the HTML content
container.innerHTML = html;
```

## API Reference

### Core Functions

#### `renderMath(options: MathOptions): { html: string; error: MathError }`

Renders a LaTeX equation to an HTML string.

```ts
import { renderMath } from 'mathsnap';

const { html, error } = renderMath({
  equation: '\\sqrt{a^2 + b^2}',
  displayMode: true,
  katexOptions: {
    minRuleThickness: 0.05,
    macros: {
      '\\RR': '\\mathbb{R}'
    }
  }
});

if (!error.hasError) {
  console.log(html); // The rendered HTML
}
```

#### `isValidEquation(equation: string): boolean`

Checks if a string is a valid LaTeX equation.

```ts
import { isValidEquation } from 'mathsnap';

const isValid = isValidEquation('x^2 + y^2 = z^2');
console.log(isValid); // true
```

#### `sanitizeEquation(equation: string): string`

Sanitizes an equation to prevent code injection.

```ts
import { sanitizeEquation } from 'mathsnap';

const safeEquation = sanitizeEquation(userInput);
```

### Predefined Equations

MathSnap comes with several predefined equations for common mathematical formulas:

```ts
import { equations } from 'mathsnap';

// Available equations:
// - equations.quadratic (Quadratic formula)
// - equations.einstein (E = mc²)
// - equations.pythagorean (a² + b² = c²)
// - equations.euler (Euler's identity)
// - equations.circleArea (Area of a circle)
// - equations.normalDistribution (Normal distribution)
// - equations.derivative (Derivative definition)
// - equations.integral (Integral definition)
// - equations.maxwellDivergenceE (Maxwell's equations - divergence of E)
// - equations.schrodinger (Schrödinger equation)

console.log(equations.euler); // e^{i\pi} + 1 = 0
```

### React Component

```tsx
import { ReactMathEquation } from 'mathsnap';

<ReactMathEquation 
  equation="E = mc^2"
  displayMode={true}
  className="custom-math"
  style={{ fontSize: '20px' }}
  as="div"
  katexOptions={{ colorIsTextColor: true }}
  onError={(error) => console.error(error)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `equation` | `string` | (required) | The LaTeX equation to render |
| `displayMode` | `boolean` | `false` | Whether to render in display mode (centered, block) or inline mode |
| `className` | `string` | `''` | Custom class name to add to the container |
| `style` | `React.CSSProperties` | `{}` | Custom inline styles for the container |
| `as` | `'div' \| 'span' \| 'p'` | Based on `displayMode` | Container element to use |
| `katexOptions` | `KatexOptions` | `{}` | Additional KaTeX options |
| `onError` | `(error: Error) => void` | `undefined` | Error callback when rendering fails |

### Svelte Component

```svelte
<MathEquation 
  equation="E = mc^2"
  displayMode={true}
  className="custom-math"
  style="font-size: 20px"
  as="div"
  katexOptions={{ colorIsTextColor: true }}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `equation` | `string` | (required) | The LaTeX equation to render |
| `displayMode` | `boolean` | `false` | Whether to render in display mode (centered, block) or inline mode |
| `className` | `string` | `''` | Custom class name to add to the container |
| `style` | `string` | `''` | Custom inline styles for the container |
| `as` | `'div' \| 'span' \| 'p'` | Based on `displayMode` | Container element to use |
| `katexOptions` | `KatexOptions` | `{}` | Additional KaTeX options |

### Vue Component

```vue
<MathEquation 
  equation="E = mc^2"
  :displayMode="true"
  className="custom-math"
  :style="{ fontSize: '20px' }"
  as="div"
  :katexOptions="{ colorIsTextColor: true }"
  @error="handleError"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `equation` | `string` | (required) | The LaTeX equation to render |
| `displayMode` | `boolean` | `false` | Whether to render in display mode (centered, block) or inline mode |
| `className` | `string` | `''` | Custom class name to add to the container |
| `style` | `Object` | `{}` | Custom inline styles for the container |
| `as` | `'div' \| 'span' \| 'p'` | Based on `displayMode` | Container element to use |
| `katexOptions` | `KatexOptions` | `{}` | Additional KaTeX options |

## Advanced Usage

### Custom KaTeX Options

You can pass any valid KaTeX options through the `katexOptions` prop:

```jsx
<ReactMathEquation 
  equation="\color{blue}{f(x) = sin(x)}"
  katexOptions={{
    colorIsTextColor: true,
    macros: {
      "\\RR": "\\mathbb{R}"
    }
  }}
/>
```

### Responsive Equations

MathSnap components are responsive by default, with `max-width: 100%` and `overflow-x: auto` to handle large equations gracefully.

### Error Handling

MathSnap provides error handling out of the box:

```jsx
<ReactMathEquation 
  equation="a = "  // Invalid equation
  onError={(error) => {
    console.error('Math rendering error:', error.message);
    // Handle the error, e.g., show a notification
  }}
/>
```

## Browser Support

MathSnap works in all modern browsers that support KaTeX.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT