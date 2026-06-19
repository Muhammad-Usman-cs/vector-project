// mergeNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const MergeNode = ({ id, data, selected }) => {
  const [separator, setSeparator] = useState(data?.separator || '\\n');

  return (
    <BaseNode
      title="Merge"
      headerColor="#8b5cf6"
      inputs={[
        { id: `${id}-a`, label: 'input A', style: { top: '35%' } },
        { id: `${id}-b`, label: 'input B', style: { top: '65%' } },
      ]}
      outputs={[{ id: `${id}-merged`, label: 'merged' }]}
      selected={selected}
    >
      <div className="node-info">
        <span className="node-info__title">Merge Inputs</span>
        <p className="node-info__desc">Combines two inputs into a single output.</p>
      </div>
      <div className="node-field">
        <label className="node-label">Separator</label>
        <select
          className="node-select"
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
        >
          <option value="\\n">Newline</option>
          <option value=" ">Space</option>
          <option value=", ">Comma</option>
          <option value="">None</option>
        </select>
      </div>
    </BaseNode>
  );
};
