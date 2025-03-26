<template>
    <div class="math-demo">
      <h1>MathSnap Vue Demo</h1>
      
      <div class="demo-section">
        <h2>Predefined Equations</h2>
        <div class="controls">
          <label>
            Choose an equation:
            <select v-model="selectedEquationKey" @change="updateSelectedEquation">
              <option v-for="key in Object.keys(equations)" :key="key" :value="key">
                {{ key }}
              </option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              v-model="displayMode"
            />
            Display mode
          </label>
        </div>
        
        <div class="equation-container">
          <MathEquation
            :equation="selectedEquation"
            :displayMode="displayMode"
            class="demo-equation"
            @error="handleError"
          />
        </div>
      </div>
      
      <div class="demo-section">
        <h2>Custom Equation</h2>
        <textarea
          v-model="customEquation"
          placeholder="Enter a LaTeX equation..."
          rows="3"
        ></textarea>
        
        <div v-if="customEquation" class="equation-container">
          <MathEquation
            :equation="customEquation"
            :displayMode="displayMode"
            class="custom-equation"
            @error="handleError"
          />
        </div>
        
        <div v-if="error" class="error-message">
          Error: {{ error }}
        </div>
      </div>
      
      <div class="demo-section">
        <h2>Styling Examples</h2>
        <div class="styled-examples">
          <div>
            <h3>Default</h3>
            <MathEquation :equation="equations.quadratic" :displayMode="true" />
          </div>
          
          <div>
            <h3>Custom Font Size</h3>
            <MathEquation
              :equation="equations.euler"
              :displayMode="true"
              :style="{ fontSize: '24px' }"
            />
          </div>
          
          <div>
            <h3>Custom Background</h3>
            <MathEquation
              :equation="equations.normalDistribution"
              :displayMode="true"
              :style="{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import MathEquation from '../../src/vue/MathEquation.vue';
  import { equations } from '../../src/core/types';
  import 'katex/dist/katex.min.css';
  
  export default defineComponent({
    name: 'MathDemo',
    components: {
      MathEquation
    },
    setup() {
      // State
      const selectedEquationKey = ref('einstein');
      const selectedEquation = ref(equations.einstein);
      const displayMode = ref(true);
      const customEquation = ref('');
      const error = ref('');
      
      // Methods
      const updateSelectedEquation = () => {
        selectedEquation.value = equations[selectedEquationKey.value];
      };
      
      const handleError = (err) => {
        error.value = err.message;
      };
      
      return {
        selectedEquationKey,
        selectedEquation,
        displayMode,
        customEquation,
        error,
        equations,
        updateSelectedEquation,
        handleError
      };
    }
  });
  </script>
  
  <style>
  .math-demo {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .demo-section {
    margin-bottom: 30px;
  }
  
  .controls {
    margin-bottom: 15px;
    display: flex;
    gap: 20px;
  }
  
  .equation-container {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
  
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
  }
  
  .error-message {
    color: #d32f2f;
    margin-top: 10px;
    padding: 8px;
    background-color: #ffebee;
    border-radius: 4px;
  }
  
  .styled-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  </style>