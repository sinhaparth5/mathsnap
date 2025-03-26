<script lang="ts">
    import MathEquation from '../../src/svelte/MathEquation.svelte';
    import { equations } from '../../src/core/types';
    import 'katex/dist/katex.min.css';
    
    // State
    let selectedEquation = equations.einstein;
    let displayMode = true;
    let customEquation = '';
    let error = '';
    
    // Handle equation selection
    function handleEquationChange(event) {
      const key = event.target.value;
      selectedEquation = equations[key];
    }
    
    // Handle custom equation input
    function handleCustomEquationChange(event) {
      customEquation = event.target.value;
    }
    
    // Handle errors
    function handleError(event) {
      error = event.detail.message;
    }
  </script>
  
  <div class="math-demo">
    <h1>MathSnap Svelte Demo</h1>
    
    <div class="demo-section">
      <h2>Predefined Equations</h2>
      <div class="controls">
        <label>
          Choose an equation:
          <select on:change={handleEquationChange}>
            {#each Object.keys(equations) as key}
              <option value={key}>{key}</option>
            {/each}
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={displayMode}
            on:change={() => displayMode = !displayMode}
          />
          Display mode
        </label>
      </div>
      
      <div class="equation-container">
        <MathEquation
          equation={selectedEquation}
          {displayMode}
          className="demo-equation"
          on:error={handleError}
        />
      </div>
    </div>
    
    <div class="demo-section">
      <h2>Custom Equation</h2>
      <textarea
        value={customEquation}
        on:input={handleCustomEquationChange}
        placeholder="Enter a LaTeX equation..."
        rows="3"
      ></textarea>
      
      {#if customEquation}
        <div class="equation-container">
          <MathEquation
            equation={customEquation}
            {displayMode}
            className="custom-equation"
            on:error={handleError}
          />
        </div>
      {/if}
      
      {#if error}
        <div class="error-message">
          Error: {error}
        </div>
      {/if}
    </div>
    
    <div class="demo-section">
      <h2>Styling Examples</h2>
      <div class="styled-examples">
        <div>
          <h3>Default</h3>
          <MathEquation equation={equations.quadratic} displayMode={true} />
        </div>
        
        <div>
          <h3>Custom Font Size</h3>
          <MathEquation
            equation={equations.euler}
            displayMode={true}
            style="font-size: 24px;"
          />
        </div>
        
        <div>
          <h3>Custom Background</h3>
          <MathEquation
            equation={equations.normalDistribution}
            displayMode={true}
            style="
              background-color: #f5f5f5;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            "
          />
        </div>
      </div>
    </div>
  </div>
  
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