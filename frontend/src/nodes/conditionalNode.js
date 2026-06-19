// conditionalNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const ConditionalNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      title="Conditional"
      headerColor="#ef4444"
      inputs={[{ id: `${id}-input`, label: 'input' }]}
      outputs={[
        { id: `${id}-true`, label: 'true', style: { top: '35%' } },
        { id: `${id}-false`, label: 'false', style: { top: '65%' } },
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-label">Condition</label>
        <input
          className="node-input"
          type="text"
          placeholder="e.g. value > 10"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>
      <div className="node-info">
        <p className="node-info__desc">
          Routes to <strong>true</strong> or <strong>false</strong> branch based on the condition.
        </p>
      </div>
    </BaseNode>
  );
};
