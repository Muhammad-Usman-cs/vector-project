// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not reach backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setResult(null);

  return (
    <>
      <button
        className={`submit-btn${loading ? ' submit-btn--loading' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Submit'}
      </button>

      {error && (
        <div className="error-toast">
          {error}
          <button className="error-toast__close" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {result && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">Pipeline Analysis</h2>
              <button className="modal__close" onClick={closeModal}>×</button>
            </div>
            <div className="modal__body">
              <div className="result-item">
                <span className="result-item__label">Nodes</span>
                <span className="result-item__value">{result.num_nodes}</span>
              </div>
              <div className="result-item">
                <span className="result-item__label">Edges</span>
                <span className="result-item__value">{result.num_edges}</span>
              </div>
              <div className="result-item">
                <span className="result-item__label">Is DAG</span>
                <span
                  className={`result-item__value result-item__value--${result.is_dag ? 'yes' : 'no'}`}
                >
                  {result.is_dag ? '✓ Yes — no cycles detected' : '✗ No — pipeline has a cycle'}
                </span>
              </div>
            </div>
            <div className="modal__footer">
              <button className="submit-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
