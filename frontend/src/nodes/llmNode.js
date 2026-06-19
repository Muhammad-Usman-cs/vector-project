// llmNode.js
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      title="LLM"
      headerColor="#d97706"
      inputs={[
        { id: `${id}-system`, label: 'system', style: { top: '33%' } },
        { id: `${id}-prompt`, label: 'prompt', style: { top: '67%' } },
      ]}
      outputs={[{ id: `${id}-response`, label: 'response' }]}
      selected={selected}
    >
      <div className="node-info">
        <span className="node-info__title">Language Model</span>
        <p className="node-info__desc">
          Accepts a system prompt and user prompt, returns a generated response.
        </p>
      </div>
    </BaseNode>
  );
};
