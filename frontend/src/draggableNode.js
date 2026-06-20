export const DraggableNode = ({ type, label, color = '#7c3aed', icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="cursor-grab h-[42px] flex items-center px-3 gap-2.5 rounded-lg bg-slate-950 border border-slate-700 select-none transition-all duration-150 hover:bg-[#1a2744] hover:border-slate-600 hover:translate-x-0.5 active:cursor-grabbing active:scale-[0.97]"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="text-sm font-bold w-[18px] text-center shrink-0" style={{ color }}>
        {icon}
      </span>
      <span className="text-xs font-medium text-slate-300">{label}</span>
    </div>
  );
};
