import { getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
import { useStore } from '../store';

export const DeletableEdge = ({
  id,
  sourceX, sourceY, sourcePosition,
  targetX, targetY, targetPosition,
  markerEnd, style, selected,
}) => {
  const deleteEdge = useStore((s) => s.deleteEdge);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        {selected && (
          <div
            className="absolute pointer-events-auto nodrag nopan"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            <button
              className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-400 text-white text-sm font-bold flex items-center justify-center shadow-lg border-2 border-slate-950 transition-colors leading-none"
              onClick={() => deleteEdge(id)}
              title="Delete edge"
            >
              ×
            </button>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
};
