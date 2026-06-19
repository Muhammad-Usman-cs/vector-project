// apiNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const [authType, setAuthType] = useState(data?.authType || 'None');

  return (
    <BaseNode
      id={id}
      title="API Call"
      headerColor="#f59e0b"
      inputs={[{ id: `${id}-body`, label: 'body' }]}
      outputs={[
        { id: `${id}-response`, label: 'response', style: { top: '35%' } },
        { id: `${id}-error`, label: 'error', style: { top: '65%' } },
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-label">Method</label>
        <select
          className="node-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-label">URL</label>
        <input
          className="node-input"
          type="text"
          placeholder="https://api.example.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label className="node-label">Auth</label>
        <select
          className="node-select"
          value={authType}
          onChange={(e) => setAuthType(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Bearer">Bearer Token</option>
          <option value="ApiKey">API Key</option>
          <option value="Basic">Basic Auth</option>
        </select>
      </div>
    </BaseNode>
  );
};
