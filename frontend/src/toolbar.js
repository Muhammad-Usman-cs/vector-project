import { DraggableNode } from './draggableNode';
import { NODE_CONFIGS } from './nodeConfigs';

export const PipelineToolbar = () => (
  <div className="p-3 flex-1">
    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em] mb-2.5 pl-1">
      Nodes
    </p>
    <div className="flex flex-col gap-1.5">
      {NODE_CONFIGS.map((n) => (
        <DraggableNode key={n.type} type={n.type} label={n.label} color={n.color} icon={n.icon} />
      ))}
    </div>
  </div>
);
