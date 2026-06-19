// draggableNode.js
export const DraggableNode = ({ type, label, color = '#7c3aed', icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="draggable-node__icon" style={{ color }}>
        {icon}
      </span>
      <span className="draggable-node__label">{label}</span>
    </div>
  );
};
