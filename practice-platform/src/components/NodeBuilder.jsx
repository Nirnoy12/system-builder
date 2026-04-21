import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomNode } from './CustomNode';
import { NODE_TYPES } from '../constants';

const nodeTypes = {
  customNode: CustomNode,
};

let id = 0;
const getId = () => `node_${id++}`;

export function NodeBuilder({ setReactFlowInstance, selectedNodeId, setSelectedNodeId, nodes, setNodes, edges, setEdges }) {
  const reactFlowWrapper = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#5b6af0', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const typeId = event.dataTransfer.getData('application/reactflow');

      if (typeof typeId === 'undefined' || !typeId) {
        return;
      }

      const nodeDef = NODE_TYPES.find(n => n.id === typeId);
      if (!nodeDef) return;

      const position = {
        x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left - 80,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top - 40,
      };

      const newNode = {
        id: getId(),
        type: 'customNode',
        position,
        data: { 
          tid: typeId, 
          lbl: nodeDef.lbl,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNodeId(newNode.id);
    },
    [setNodes, setSelectedNodeId]
  );

  const onSelectionChange = useCallback(({ nodes }) => {
    if (nodes.length > 0) {
      setSelectedNodeId(nodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  }, [setSelectedNodeId]);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  return (
    <div className="canvas-area" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#d1d5db" gap={22} size={1} />
        <Controls />
      </ReactFlow>
      
      {nodes.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#9ca3af',
          pointerEvents: 'none',
        }}>
          <svg style={{ width: 48, height: 48, stroke: '#d1d5db', fill: 'none', margin: '0 auto 16px', display: 'block' }} viewBox="0 0 48 48" strokeWidth="1.5">
            <rect x="6" y="14" width="14" height="20" rx="3" />
            <rect x="28" y="14" width="14" height="20" rx="3" />
            <path d="M20 24h8" strokeDasharray="3 2" />
          </svg>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>Drag nodes from the palette to start building</p>
          <p style={{ fontSize: '13px' }}>Connect output ports to input ports to create logic flows</p>
        </div>
      )}
    </div>
  );
}
