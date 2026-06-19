// filterNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data, selected }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      title="Filter"
      headerColor="#06b6d4"
      inputs={[{ id: `${id}-data`, label: 'data' }]}
      outputs={[
        { id: `${id}-pass`, label: 'pass', style: { top: '35%' } },
        { id: `${id}-fail`, label: 'fail', style: { top: '65%' } },
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-label">Field</label>
        <input
          className="node-input"
          type="text"
          placeholder="field name"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label className="node-label">Operator</label>
        <select
          className="node-select"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="equals">equals</option>
          <option value="not_equals">not equals</option>
          <option value="contains">contains</option>
          <option value="greater_than">greater than</option>
          <option value="less_than">less than</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-label">Value</label>
        <input
          className="node-input"
          type="text"
          placeholder="compare value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
