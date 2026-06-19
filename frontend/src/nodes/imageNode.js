// imageNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const ImageNode = ({ id, data, selected }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [altText, setAltText] = useState(data?.altText || '');

  return (
    <BaseNode
      title="Image"
      headerColor="#ec4899"
      inputs={[]}
      outputs={[{ id: `${id}-image`, label: 'image' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-label">Image URL</label>
        <input
          className="node-input"
          type="text"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label className="node-label">Alt Text</label>
        <input
          className="node-input"
          type="text"
          placeholder="Describe the image"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
      </div>
      {url && (
        <img
          src={url}
          alt={altText}
          className="node-image-preview"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </BaseNode>
  );
};
