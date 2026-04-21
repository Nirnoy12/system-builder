import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { NodeBuilder } from './components/NodeBuilder';
import { PropertiesPanel } from './components/PropertiesPanel';
import { ChallengeBriefModal, SubmitModal, SuccessModal } from './components/Modals';
import { SubmitFlow } from './components/SubmitFlow';
import { Layers, ArrowLeft, Check, Compass } from 'lucide-react';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(true);

  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitFlowVisible, setIsSubmitFlowVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const updateNodeData = (nodeId, data) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...data };
        }
        return node;
      })
    );
  };

  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNodeId(null);
  };

  const handleInitialSubmit = () => {
    setIsSubmitFlowVisible(true);
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    setIsSuccessModalOpen(true);
    setTimerRunning(false);
  };

  const resetChallenge = () => {
    setIsSuccessModalOpen(false);
    setIsSubmitFlowVisible(false);
    setTimeLeft(45 * 60);
    setTimerRunning(true); // Technically could restart or stop
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="app-container">
      <header className="app-header" style={{ padding: '0 20px', borderBottom: '1px solid #e5e7eb', height: '56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px', color: '#111827' }}>
            <Layers size={18} />
            superset
          </div>
          <div style={{ color: '#d1d5db' }}>|</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '13px', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Builder
          </div>
          <div style={{ color: '#d1d5db' }}>|</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
            FestHelp Desk Agent
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500, marginRight: '8px' }}>
            {timeLeft > 0 ? formatTime(timeLeft) : '00:00'}
          </div>
          <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500, marginRight: '8px' }}>
            Saved
          </div>
          
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            padding: '6px 14px', borderRadius: '20px', 
            border: '1px solid #e0e7ff', background: '#eef2ff', 
            color: '#4f46e5', fontSize: '13px', fontWeight: 600 
          }}>
            <Compass size={14} /> Walkthrough
          </button>
          
          <button 
            onClick={handleInitialSubmit}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', 
              padding: '6px 14px', borderRadius: '20px', 
              background: '#111827', color: '#ffffff', 
              fontSize: '13px', fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Check size={14} /> Submit
          </button>
          
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '50%', 
            background: '#111827', color: '#ffffff', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px'
          }}>
            MP
          </div>
        </div>
      </header>

      <div className="workspace">
        <Sidebar onDragStart={onDragStart} onOpenBrief={() => setIsBriefOpen(true)} />
        
        <ReactFlowProvider>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <NodeBuilder 
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              selectedNodeId={selectedNodeId}
              setSelectedNodeId={setSelectedNodeId}
              setReactFlowInstance={setReactFlowInstance}
            />
            <SubmitFlow isVisible={isSubmitFlowVisible} nodes={nodes} />
          </div>
        </ReactFlowProvider>

        <PropertiesPanel 
          selectedNode={selectedNode}
          onUpdateNode={updateNodeData}
          onDeleteNode={deleteNode}
        />
      </div>

      <ChallengeBriefModal 
        isOpen={isBriefOpen} 
        onClose={() => setIsBriefOpen(false)} 
      />
      
      <SubmitModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)} 
        onConfirm={handleConfirmSubmit} 
      />
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onContinue={resetChallenge} 
      />
    </div>
  );
}

export default App;
