// baseNode.js — shared wrapper for all node types
import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  title,
  headerColor = '#7c3aed',
  inputs = [],   // [{ id, label?, style? }]
  outputs = [],  // [{ id, label?, style? }]
  children,
  minWidth = 220,
  selected = false,
}) => {
  const inputCount = inputs.length;
  const outputCount = outputs.length;

  const inputTop = (idx) =>
    inputCount === 1 ? '50%' : `${((idx + 1) / (inputCount + 1)) * 100}%`;

  const outputTop = (idx) =>
    outputCount === 1 ? '50%' : `${((idx + 1) / (outputCount + 1)) * 100}%`;

  return (
    <div
      className={`base-node${selected ? ' base-node--selected' : ''}`}
      style={{ minWidth }}
    >
      {inputs.map((input, idx) => {
        const top = input.style?.top || inputTop(idx);
        return (
          <Fragment key={input.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={input.id}
              style={{ top }}
            />
            {input.label && (
              <span className="handle-label handle-label--left" style={{ top }}>
                {input.label}
              </span>
            )}
          </Fragment>
        );
      })}

      <div className="base-node__header" style={{ background: headerColor }}>
        <span className="base-node__title">{title}</span>
      </div>

      <div className="base-node__body">{children}</div>

      {outputs.map((output, idx) => {
        const top = output.style?.top || outputTop(idx);
        return (
          <Fragment key={output.id}>
            {output.label && (
              <span className="handle-label handle-label--right" style={{ top }}>
                {output.label}
              </span>
            )}
            <Handle
              type="source"
              position={Position.Right}
              id={output.id}
              style={{ top }}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
