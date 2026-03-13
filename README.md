# MathSnap

[![npm version](https://img.shields.io/npm/v/mathsnap.svg)](https://www.npmjs.com/package/mathsnap)
[![license](https://img.shields.io/npm/l/mathsnap.svg)](https://github.com/sinhaparth5/mathsnap/blob/master/LICENSE)
[![test](https://github.com/sinhaparth5/mathsnap/actions/workflows/release.yml/badge.svg)](https://github.com/sinhaparth5/mathsnap/actions)

A lightweight, framework-agnostic wrapper around [KaTeX](https://katex.org/) that makes rendering LaTeX math equations simple. Works with **React**, **Vue**, **Svelte**, and **vanilla JS/TS** — ships with its own optimised CSS, no KaTeX install needed.

## Features

- Render LaTeX equations with a single import
- Components for React (`.jsx` / `.tsx`), Vue (`.vue`), and Svelte (`.svelte`)
- Ships with `mathsnap.min.css` — 23 KB instead of the 1.4 MB you'd get from inlining KaTeX fonts
- Responsive by default (`max-width: 100%`, `overflow-x: auto`)
- Built-in error handling — renders an error message instead of crashing
- Full TypeScript support
- Tree-shakeable

## Installation

```bash
npm install mathsnap
# or
yarn add mathsnap
# or
pnpm add mathsnap
```

> KaTeX is a direct dependency — no separate install needed.

## CSS

Add **one** import at the top of your app's entry file:

```ts
import 'mathsnap/mathsnap.min.css';
// or the alias:
import 'mathsnap/style';
```

This loads the 23 KB KaTeX stylesheet (fonts are separate files loaded on demand by the browser). Do this **once** — you don't need it in every component file.

---

## Usage

### React (`.jsx` / `.tsx`)

```tsx
import { MathEquation, equations } from 'mathsnap/react';

export default function App() {
  return (
    <>
      {/* Block / display mode */}
      <MathEquation equation={equations.quadratic} displayMode />

      {/* Inline mode */}
      <p>
        Einstein proved that <MathEquation equation={equations.einstein} /> relates
        mass and energy.
      </p>

      {/* Custom equation */}
      <MathEquation
        equation="f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi)\,e^{2\pi i \xi x}\,d\xi"
        displayMode
        className="my-equation"
        style={{ fontSize: '1.2rem' }}
        onError={(err) => console.error(err)}
      />
    </>
  );
}
```

You can also import directly from the main entry:

```tsx
import { ReactMathEquation, equations } from 'mathsnap';

<ReactMathEquation equation={equations.euler} displayMode />
```

---

### Vue (`.vue`)

```vue
<template>
  <!-- Block / display mode -->
  <MathEquation :equation="equations.circleArea" :display-mode="true" />

  <!-- Inline mode -->
  <p>
    The formula <MathEquation :equation="equations.pythagorean" /> is the
    Pythagorean theorem.
  </p>

  <!-- Error handling via event -->
  <MathEquation
    equation="\nabla \times \vec{B} = \mu_0 \vec{J}"
    :display-mode="true"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import MathEquation from 'mathsnap/vue';
import { equations } from 'mathsnap';

function handleError(err: Error) {
  console.error('Render error:', err);
}
</script>
```

---

### Svelte (`.svelte`)

```svelte
<script lang="ts">
  import MathEquation from 'mathsnap/svelte';
  import { equations } from 'mathsnap';
</script>

<!-- Block / display mode -->
<MathEquation equation={equations.schrodinger} displayMode={true} />

<!-- Inline mode -->
<p>
  Euler's identity <MathEquation equation={equations.euler} /> is considered
  the most beautiful equation in mathematics.
</p>

<!-- Error handling -->
<MathEquation
  equation="\frac{d}{dx} e^x = e^x"
  displayMode={true}
  onError={(err) => console.error(err)}
/>
```

---

### Vanilla JS / TS (`.js` / `.ts`)

```ts
import { renderMath, equations } from 'mathsnap';

const container = document.getElementById('math')!;

const { html, error } = renderMath({
  equation: equations.normalDistribution,
  displayMode: true,
});

if (!error.hasError) {
  container.innerHTML = html;
}
```

---

## Predefined Equations

```ts
import { equations } from 'mathsnap';

equations.quadratic          // Quadratic formula
equations.einstein           // E = mc²
equations.pythagorean        // a² + b² = c²
equations.euler              // Euler's identity  e^{iπ} + 1 = 0
equations.circleArea         // Area of a circle
equations.normalDistribution // Normal distribution
equations.derivative         // Derivative definition
equations.integral           // Integral definition (FTC)
equations.maxwellDivergenceE // Maxwell's equations (∇·E)
equations.schrodinger        // Schrödinger equation
```

---

## API

### `renderMath(options)`

Renders a LaTeX string to an HTML string using KaTeX. Returns `{ html, error }`.

```ts
import { renderMath } from 'mathsnap';

const { html, error } = renderMath({
  equation: '\\sqrt{a^2 + b^2}',
  displayMode: true,
  katexOptions: {
    macros: { '\\RR': '\\mathbb{R}' },
  },
  onError: (err) => console.error(err),
});

if (!error.hasError) {
  document.getElementById('math')!.innerHTML = html;
}
```

### `isValidEquation(equation)`

Returns `true` if the string is valid LaTeX, `false` otherwise.

```ts
import { isValidEquation } from 'mathsnap';

isValidEquation('x^2 + y^2 = z^2'); // true
isValidEquation('\\badinvalid{');    // false
```

### `sanitizeEquation(equation)`

Strips HTML/script tags from a string before rendering. Called automatically by all components.

```ts
import { sanitizeEquation } from 'mathsnap';

sanitizeEquation('<script>alert(1)</script>x^2'); // 'x^2'
```

---

## Component Props

All framework components share the same props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `equation` | `string` | **required** | LaTeX equation string |
| `displayMode` | `boolean` | `false` | Block/centred mode (`true`) vs inline (`false`) |
| `className` | `string` | `''` | Extra CSS class on the container element |
| `style` | `object` / `string` | `{}` / `''` | Inline styles — object for React/Vue, string for Svelte |
| `as` | `'div' \| 'span' \| 'p'` | auto | Override the container element |
| `katexOptions` | `KatexOptions` | `{}` | Extra [KaTeX options](https://katex.org/docs/options) |
| `onError` | `(error: Error) => void` | — | Called when KaTeX rendering fails |

> Vue additionally emits an `error` event — use `@error="handler"` in the template.

---

## Advanced

### Custom KaTeX macros

```tsx
<MathEquation
  equation="\RR \to \CC"
  katexOptions={{
    macros: {
      '\\RR': '\\mathbb{R}',
      '\\CC': '\\mathbb{C}',
    },
  }}
/>
```

### Error handling

When rendering fails, the component renders an inline error span styled in red rather than throwing. You can also receive the error via `onError`:

```tsx
<MathEquation
  equation="\invalid{"
  onError={(err) => console.error('Math error:', err.message)}
/>
```

---

## Contributing

PRs are welcome. Please open an issue first for larger changes.

## License

MIT © [Parth Sinha](https://github.com/sinhaparth5)
