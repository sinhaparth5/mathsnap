<template>
    <component 
      :is="containerComponent"
      :class="containerClass"
      :style="containerStyle"
      v-html="htmlContent"
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, watchEffect, ref } from 'vue';
  import { renderMath, sanitizeEquation } from '../core/renderMaths';
  import type { MathOptions } from '../core/types';
  import 'katex/dist/katex.min.css';
  
  export default defineComponent({
    name: 'MathEquation',
    props: {
      equation: {
        type: String,
        required: true
      },
      displayMode: {
        type: Boolean,
        default: false
      },
      className: {
        type: String,
        default: ''
      },
      style: {
        type: Object,
        default: () => ({})
      },
      katexOptions: {
        type: Object,
        default: () => ({})
      },
      as: {
        type: String,
        default: null,
        validator: (value: string) => ['div', 'span', 'p'].includes(value)
      }
    },
    setup(props, { emit }) {
      // Internal state
      const htmlContent = ref('');
      const hasError = ref(false);
      const errorMessage = ref('');
      
      // Determine the container component
      const containerComponent = computed(() => {
        if (props.as) return props.as;
        return props.displayMode ? 'div' : 'span';
      });
      
      // Computed classes
      const containerClass = computed(() => {
        return {
          'mathsnap-equation': true,
          'mathsnap-display': props.displayMode,
          'mathsnap-inline': !props.displayMode,
          [props.className]: Boolean(props.className)
        };
      });
      
      // Computed styles with responsiveness
      const containerStyle = computed(() => {
        return {
          maxWidth: '100%',
          overflowX: 'auto',
          display: props.displayMode ? 'block' : 'inline-block',
          ...props.style
        };
      });
      
      // Error handler
      const handleError = (error: Error) => {
        errorMessage.value = error.message;
        hasError.value = true;
        emit('error', error);
      };
      
      // Watch for changes to the equation and re-render
      watchEffect(() => {
        // Sanitize the equation
        const cleanEquation = sanitizeEquation(props.equation);
        
        // Generate the HTML
        const result = renderMath({
          equation: cleanEquation,
          displayMode: props.displayMode,
          katexOptions: props.katexOptions,
          onError: handleError
        });
        
        htmlContent.value = result.html;
        hasError.value = result.error.hasError;
        errorMessage.value = result.error.message;
      });
      
      return {
        htmlContent,
        hasError,
        errorMessage,
        containerComponent,
        containerClass,
        containerStyle
      };
    }
  });
  </script>
  
  <style>
  .mathsnap-display {
    margin: 1em 0;
  }
  </style>