import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const labelBase = 'absolute text-[9px] text-slate-500 whitespace-nowrap pointer-events-none leading-none font-medium -translate-y-1/2';

export const BaseNode = ({
  id,
  title,
  headerColor = '#7c3aed',
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  selected = false,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const inputCount  = inputs.length;
  const outputCount = outputs.length;

  const inputTop  = (idx) => inputCount  === 1 ? '50%' : `${((idx + 1) / (inputCount  + 1)) * 100}%`;
  const outputTop = (idx) => outputCount === 1 ? '50%' : `${((idx + 1) / (outputCount + 1)) * 100}%`;

  return (
    <div
      className={`bg-slate-800 border rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] overflow-visible text-xs relative transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] hover:border-slate-600 ${
        selected
          ? 'border-violet-600 shadow-[0_0_0_2px_rgba(124,58,237,0.3),0_8px_28px_rgba(0,0,0,0.5)]'
          : 'border-slate-700'
      }`}
      style={{ minWidth }}
    >
      {inputs.map((input, idx) => {
        const top = input.style?.top || inputTop(idx);
        return (
          <Fragment key={input.id}>
            <Handle type="target" position={Position.Left} id={input.id} style={{ top }} />
            {input.label && (
              <span className={`${labelBase} left-[-8px] -translate-x-full text-right`} style={{ top }}>
                {input.label}
              </span>
            )}
          </Fragment>
        );
      })}

      <div
        className="px-3 py-[7px] rounded-t-[9px] flex items-center justify-between gap-1.5"
        style={{ background: headerColor }}
      >
        <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.1em] flex-1">{title}</span>
        <button
          className="bg-transparent border-none text-white/50 text-base leading-none cursor-pointer px-0.5 rounded transition-colors hover:text-white hover:bg-black/25 shrink-0"
          onClick={() => deleteNode(id)}
          title="Remove node"
        >
          ×
        </button>
      </div>

      <div className="p-[10px] px-3 flex flex-col gap-2">{children}</div>

      {outputs.map((output, idx) => {
        const top = output.style?.top || outputTop(idx);
        return (
          <Fragment key={output.id}>
            {output.label && (
              <span className={`${labelBase} right-[-8px] translate-x-full text-left`} style={{ top }}>
                {output.label}
              </span>
            )}
            <Handle type="source" position={Position.Right} id={output.id} style={{ top }} />
          </Fragment>
        );
      })}
    </div>
  );
};
