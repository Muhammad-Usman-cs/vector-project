import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { fieldWrap, fieldLabel, fieldInput, fieldSelect } from './nodeStyles';

const TextField = ({ field, value, onChange }) => (
  <div className={fieldWrap}>
    <label className={fieldLabel}>{field.label}</label>
    <input
      className={fieldInput}
      type="text"
      placeholder={field.placeholder || ''}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const SelectField = ({ field, value, onChange }) => (
  <div className={fieldWrap}>
    <label className={fieldLabel}>{field.label}</label>
    <select className={fieldSelect} value={value} onChange={(e) => onChange(e.target.value)}>
      {field.options.map((opt) => {
        const val = typeof opt === 'object' ? opt.value : opt;
        const lbl = typeof opt === 'object' ? opt.label : opt;
        return <option key={val} value={val}>{lbl}</option>;
      })}
    </select>
  </div>
);

const InfoBlock = ({ field }) => (
  <div className="flex flex-col gap-1">
    {field.render
      ? field.render()
      : <>
          {field.title       && <span className="text-xs font-semibold text-slate-200">{field.title}</span>}
          {field.description && <p className="text-[11px] text-slate-500 leading-relaxed">{field.description}</p>}
        </>
    }
  </div>
);

const RENDERERS = {
  text:   (field, value, onChange) => <TextField   field={field} value={value} onChange={onChange} />,
  select: (field, value, onChange) => <SelectField field={field} value={value} onChange={onChange} />,
  info:   (field)                  => <InfoBlock   field={field} />,
};

export const ConfiguredNode = ({ id, data, selected, config }) => {
  const updateField = useStore((s) => s.updateNodeField);

  const inputs  = (config.inputs  || []).map((h) => ({ ...h, id: `${id}-${h.id}` }));
  const outputs = (config.outputs || []).map((h) => ({ ...h, id: `${id}-${h.id}` }));

  return (
    <BaseNode
      id={id}
      title={config.label}
      headerColor={config.color}
      inputs={inputs}
      outputs={outputs}
      selected={selected}
    >
      {(config.fields || []).map((field, idx) => {
        const key      = field.key || `info-${idx}`;
        const value    = data?.[field.key] ?? field.default ?? '';
        const onChange = (val) => updateField(id, field.key, val);
        const render   = RENDERERS[field.type];
        return render ? <div key={key}>{render(field, value, onChange)}</div> : null;
      })}
    </BaseNode>
  );
};

export const createConfiguredNode = (config) => {
  const Node = ({ id, data, selected }) => (
    <ConfiguredNode id={id} data={data} selected={selected} config={config} />
  );
  Node.displayName = `Node(${config.type})`;
  return Node;
};
