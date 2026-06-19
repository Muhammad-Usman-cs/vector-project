// textNode.js
import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './baseNode';

const VALID_VAR = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;

const extractVariables = (text) => {
  const seen = new Set();
  let match;
  VALID_VAR.lastIndex = 0;
  while ((match = VALID_VAR.exec(text)) !== null) {
    seen.add(match[1]);
  }
  return [...seen];
};

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const textareaRef = useRef(null);

  // Compute dynamic min-width based on longest line
  const lines = currText.split('\n');
  const maxLen = Math.max(...lines.map((l) => l.length), 20);
  const dynamicWidth = Math.max(220, Math.min(520, maxLen * 7.5 + 60));

  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const variableInputs = variables.map((varName, idx) => ({
    id: `${id}-${varName}`,
    label: varName,
    style: {
      top:
        variables.length === 1
          ? '50%'
          : `${((idx + 1) / (variables.length + 1)) * 100}%`,
    },
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      headerColor="#2563eb"
      inputs={variableInputs}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      selected={selected}
      minWidth={dynamicWidth}
    >
      <div className="node-field">
        <label className="node-label">Text</label>
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={3}
        />
      </div>
      {variables.length > 0 && (
        <div className="node-variables">
          {variables.map((v) => (
            <span key={v} className="node-variable-tag">
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
