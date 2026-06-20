import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

const btnBase =
  'bg-gradient-to-br from-violet-600 to-indigo-600 text-white border-none rounded-lg py-[9px] px-6 text-[13px] font-semibold cursor-pointer tracking-wide transition-all duration-200 shadow-[0_4px_12px_rgba(124,58,237,0.35)] whitespace-nowrap';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

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
      setResult(await response.json());
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
        className={`${btnBase} hover:opacity-90 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(124,58,237,0.5)] active:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Submit'}
      </button>

      {error && (
        <div className="fixed bottom-20 right-5 bg-red-950 border border-red-500 text-red-300 text-xs py-2.5 px-3.5 rounded-lg flex items-center gap-2.5 z-[999] max-w-[340px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] animate-slideUp">
          {error}
          <button
            className="bg-transparent border-none text-red-300 text-base cursor-pointer px-0.5 leading-none shrink-0"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {result && (
        <div
          className="fixed inset-0 bg-black/65 flex items-center justify-center z-[1000] backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-2xl w-[360px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3.5 border-b border-slate-700">
              <h2 className="text-[15px] font-bold text-slate-200">Pipeline Analysis</h2>
              <button
                className="bg-transparent border-none text-slate-500 text-xl cursor-pointer leading-none py-0.5 px-1.5 rounded hover:text-slate-200 hover:bg-slate-700 transition-colors"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              {[
                { label: 'Nodes', value: result.num_nodes },
                { label: 'Edges', value: result.num_edges },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-[0.06em]">{label}</span>
                  <span className="text-sm font-bold text-slate-200">{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-[0.06em]">Is DAG</span>
                <span className={`text-sm font-bold ${result.is_dag ? 'text-emerald-400' : 'text-red-400'}`}>
                  {result.is_dag ? '✓ Yes — no cycles detected' : '✗ No — pipeline has a cycle'}
                </span>
              </div>
            </div>

            <div className="px-5 pb-[18px] pt-3.5 flex justify-end border-t border-slate-700">
              <button className={`${btnBase} hover:opacity-90`} onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
