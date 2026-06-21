import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { fieldWrap, fieldLabel, fieldInput } from './nodeStyles';

export const ImageNode = ({ id, data, selected }) => {
  const updateField = useStore((s) => s.updateNodeField);
  const [imgError, setImgError] = useState(false);
  const url     = data?.url     || '';
  const altText = data?.altText || '';

  const handleUrlChange = (val) => {
    setImgError(false);
    updateField(id, 'url', val);
  };

  return (
    <BaseNode
      id={id} title="Image" headerColor="#ec4899"
      inputs={[]} outputs={[{ id: `${id}-image`, label: 'image' }]}
      selected={selected}
    >
      <div className={fieldWrap}>
        <label className={fieldLabel}>Image URL</label>
        <input
          className={fieldInput} type="text" placeholder="https://..."
          value={url} onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>
      <div className={fieldWrap}>
        <label className={fieldLabel}>Alt Text</label>
        <input
          className={fieldInput} type="text" placeholder="Describe the image"
          value={altText} onChange={(e) => updateField(id, 'altText', e.target.value)}
        />
      </div>
      {url && !imgError && (
        <img
          key={url}
          src={url} alt={altText}
          className="w-full max-h-[100px] object-cover rounded-md border border-slate-700 mt-0.5"
          onError={() => setImgError(true)}
        />
      )}
      {url && imgError && (
        <div className="text-[11px] text-red-400 bg-red-950/40 border border-red-800/50 rounded-md px-2 py-1.5 mt-0.5 leading-relaxed">
          Could not load image. The URL may be blocked or invalid.
        </div>
      )}
    </BaseNode>
  );
};
