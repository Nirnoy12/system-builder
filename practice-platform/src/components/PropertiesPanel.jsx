import React from 'react';
import { NODE_PROPERTIES, NODE_TYPES } from '../constants';
import { Settings2, Trash2 } from 'lucide-react';

export function PropertiesPanel({ selectedNode, onUpdateNode, onDeleteNode }) {
  if (!selectedNode) {
    return (
      <aside className="properties-panel">
        <div className="empty-state">
          <div>
            <div style={{ fontWeight: 600, marginBottom: '8px', color: '#374151' }}>No node selected</div>
            <div style={{ fontSize: '13px' }}>Select a node on the canvas<br/>to edit its properties.</div>
          </div>
        </div>
      </aside>
    );
  }

  const nodeType = NODE_TYPES.find(n => n.id === selectedNode.data.tid);
  const properties = NODE_PROPERTIES[selectedNode.data.tid] || [];
  const data = selectedNode.data;

  const handleChange = (key, value) => {
    onUpdateNode(selectedNode.id, { ...data, [key]: value });
  };

  return (
    <aside className="properties-panel">
      
      <div className="panel-content" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: nodeType?.col, fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            {nodeType?.lbl}
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>
            {properties.length > 0 ? properties[0].p : 'Configure this node for your workflow.'}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Label</label>
          <input
            className="form-input"
            value={data.lbl || ''}
            onChange={(e) => handleChange('lbl', e.target.value)}
          />
        </div>

        {properties.map((prop) => (
          <div key={prop.k} className="form-group">
            <label className="form-label">{prop.l}</label>
            
            {prop.t === 'sel' && (
              <select 
                className="form-select"
                value={data[prop.k] || ''}
                onChange={(e) => handleChange(prop.k, e.target.value)}
              >
                {prop.o.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {prop.t === 'inp' && (
              <input
                className="form-input"
                placeholder={prop.p}
                value={data[prop.k] || ''}
                onChange={(e) => handleChange(prop.k, e.target.value)}
              />
            )}

            {prop.t === 'ta' && (
              <textarea
                className="form-textarea"
                placeholder={prop.p}
                value={data[prop.k] || ''}
                onChange={(e) => handleChange(prop.k, e.target.value)}
              />
            )}
          </div>
        ))}
        
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button 
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              padding: '10px',
              color: '#ef4444', 
              background: 'transparent',
              border: '1px solid #fee2e2',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            onClick={() => onDeleteNode(selectedNode.id)}
            onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Trash2 size={16} /> Delete node
          </button>
        </div>
      </div>
    </aside>
  );
}
