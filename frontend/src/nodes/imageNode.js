import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { fieldWrap, fieldLabel, fieldInput } from './nodeStyles';

export const ImageNode = ({ id, data, selected }) => {
  const updateField = useStore((s) => s.updateNodeField);
  const url     = data?.url     || '';
  const altText = data?.altText || '';

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
          value={url} onChange={(e) => updateField(id, 'url', e.target.value)}
        />
      </div>
      <div className={fieldWrap}>
        <label className={fieldLabel}>Alt Text</label>
        <input
          className={fieldInput} type="text" placeholder="Describe the image"
          value={altText} onChange={(e) => updateField(id, 'altText', e.target.value)}
        />
      </div>
      {url && (
        <img
          src={url} alt={altText}
          className="w-full max-h-[100px] object-cover rounded-md border border-slate-700 mt-0.5"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </BaseNode>
  );
};
