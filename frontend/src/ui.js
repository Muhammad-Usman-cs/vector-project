import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { NODE_CONFIGS } from './nodeConfigs';
import { createConfiguredNode } from './nodes/configuredNode';
import { DeletableEdge } from './edges/deletableEdge';
import 'reactflow/dist/style.css';

const gridSize   = 20;
const proOptions = { hideAttribution: true };

// Built once at module level — ReactFlow requires a stable reference.
const nodeTypes = Object.fromEntries(
  NODE_CONFIGS.map((cfg) => [cfg.type, cfg.component || createConfiguredNode(cfg)])
);

const edgeTypes = { deletable: DeletableEdge };

const getInitNodeData = (nodeID, type) => {
  const cfg = NODE_CONFIGS.find((c) => c.type === type);
  if (!cfg) return { id: nodeID, nodeType: type };

  const fieldDefaults = {};
  (cfg.fields || []).forEach((f) => {
    if (f.key && f.default !== undefined) fieldDefaults[f.key] = f.default;
  });

  return {
    id: nodeID,
    nodeType: type,
    ...fieldDefaults,
    ...(cfg.getDefaults ? cfg.getDefaults(nodeID) : {}),
  };
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper                    = useRef(null);
  const [reactFlowInstance, setInstance]    = useState(null);
  const { nodes, edges, getNodeID, addNode,
          onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds  = reactFlowWrapper.current.getBoundingClientRect();
      const payload = event?.dataTransfer?.getData('application/reactflow');
      if (!payload) return;

      const { nodeType: type } = JSON.parse(payload);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({ id: nodeID, type, position, data: getInitNodeData(nodeID, type) });
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        onConnect={onConnect} onDrop={onDrop} onDragOver={onDragOver}
        onInit={setInstance} nodeTypes={nodeTypes} edgeTypes={edgeTypes} proOptions={proOptions}
        snapGrid={[gridSize, gridSize]} connectionLineType="smoothstep" fitView
      >
        <Background color="#1e293b" gap={gridSize} variant={BackgroundVariant.Dots} />
        <Controls />
        <MiniMap
          nodeColor={(node) => NODE_CONFIGS.find((c) => c.type === node.type)?.color || '#334155'}
          maskColor="rgba(0,0,0,0.4)"
        />
      </ReactFlow>
    </div>
  );
};
