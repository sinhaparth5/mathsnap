import React, { useState } from 'react';
import { ReactMathEquation, equations } from '../../src';
import 'katex/dist/katex.min.css';

const MathEquationDemo: React.FC = () => {
  const [selectedEquation, setSelectedEquation] = useState<string>(equations.einstein);
  const [displayMode, setDisplayMode] = useState<boolean>(true);
  const [customEquation, setCustomEquation] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEquationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as keyof typeof equations;
    setSelectedEquation(equations[key]);
  };

  const handleCustomEquationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomEquation(e.target.value);
  };

  const handleError = (err: Error) => {
    setError(err.message);
  };

  return (
    <div className="math-demo">
      <h1>MathSnap React Demo</h1>
      
      <div className="demo-section">
        <h2>Predefined Equations</h2>
        <div className="controls">
          <label>
            Choose an equation:
            <select onChange={handleEquationChange}>
              {Object.keys(equations).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={displayMode}
              onChange={() => setDisplayMode(!displayMode)}
            />
            Display mode
          </label>
        </div>
        
        <div className="equation-container">
          <ReactMathEquation
            equation={selectedEquation}
            displayMode={displayMode}
            className="demo-equation"
            onError={handleError}
          />
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Custom Equation</h2>
        <textarea
          value={customEquation}
          onChange={handleCustomEquationChange}
          placeholder="Enter a LaTeX equation..."
          rows={3}
        />
        
        {customEquation && (
          <div className="equation-container">
            <ReactMathEquation
              equation={customEquation}
              displayMode={displayMode}
              className="custom-equation"
              onError={handleError}
            />
          </div>
        )}
        
        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}
      </div>
      
      <div className="demo-section">
        <h2>Styling Examples</h2>
        <div className="styled-examples">
          <div>
            <h3>Default</h3>
            <ReactMathEquation equation={equations.quadratic} displayMode={true} />
          </div>
          
          <div>
            <h3>Custom Font Size</h3>
            <ReactMathEquation
              equation={equations.euler}
              displayMode={true}
              style={{ fontSize: '24px' }}
            />
          </div>
          
          <div>
            <h3>Custom Background</h3>
            <ReactMathEquation
              equation={equations.normalDistribution}
              displayMode={true}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathEquationDemo;