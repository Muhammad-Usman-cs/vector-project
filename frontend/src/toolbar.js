// toolbar.js
import { DraggableNode } from './draggableNode';

const NODE_TYPES = [
  { type: 'customInput', label: 'Input',       color: '#7c3aed', icon: '→' },
  { type: 'customOutput', label: 'Output',     color: '#059669', icon: '←' },
  { type: 'llm',          label: 'LLM',        color: '#d97706', icon: '✦' },
  { type: 'text',         label: 'Text',       color: '#2563eb', icon: 'T' },
  { type: 'image',        label: 'Image',      color: '#ec4899', icon: '⬜' },
  { type: 'filter',       label: 'Filter',     color: '#06b6d4', icon: '⚡' },
  { type: 'api',          label: 'API Call',   color: '#f59e0b', icon: '⇄' },
  { type: 'merge',        label: 'Merge',      color: '#8b5cf6', icon: '⊕' },
  { type: 'conditional',  label: 'Conditional',color: '#ef4444', icon: '?' },
];

export const PipelineToolbar = () => {
  return (
    <div className="toolbar-container">
      <p className="toolbar-title">Nodes</p>
      <div className="toolbar-nodes">
        {NODE_TYPES.map((n) => (
          <DraggableNode key={n.type} type={n.type} label={n.label} color={n.color} icon={n.icon} />
        ))}
      </div>
    </div>
  );
};
