import { useEffect, useRef } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { fieldWrap, fieldLabel, fieldTextarea } from './nodeStyles';

const VALID_VAR = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

const extractVariables = (text) => {
  const seen = new Set();
  let match;
  VALID_VAR.lastIndex = 0;
  while ((match = VALID_VAR.exec(text)) !== null) seen.add(match[1]);
  return [...seen];
};

export const TextNode = ({ id, data, selected }) => {
  const updateField  = useStore((s) => s.updateNodeField);
  const currText     = data?.text || '{{input}}';
  const textareaRef  = useRef(null);

  const variables    = extractVariables(currText);
  const lines        = currText.split('\n');
  const maxLen       = Math.max(...lines.map((l) => l.length), 20);
  const dynamicWidth = Math.max(220, Math.min(520, maxLen * 7.5 + 60));

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
      top: variables.length === 1 ? '50%' : `${((idx + 1) / (variables.length + 1)) * 100}%`,
    },
  }));

  return (
    <BaseNode
      id={id} title="Text" headerColor="#2563eb"
      inputs={variableInputs}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      selected={selected}
      minWidth={dynamicWidth}
    >
      <div className={fieldWrap}>
        <label className={fieldLabel}>Text</label>
        <textarea
          ref={textareaRef}
          className={fieldTextarea}
          value={currText}
          onChange={(e) => updateField(id, 'text', e.target.value)}
          rows={3}
        />
      </div>
      {variables.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {variables.map((v) => (
            <span key={v} className="bg-violet-600/15 border border-violet-500/40 text-violet-400 text-[10px] py-0.5 px-1.5 rounded font-mono">
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
