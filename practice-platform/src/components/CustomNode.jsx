import { Handle, Position } from '@xyflow/react';
import { NODE_TYPES } from '../constants';
import { getIconForType } from './Sidebar';

export function CustomNode({ data, selected }) {
  const nodeDef = NODE_TYPES.find(n => n.id === data.tid) || NODE_TYPES[0];
  const IconComponent = getIconForType(nodeDef.id);
  
  return (
    <div className={`wfn ${selected ? 'sel' : ''}`} style={{
      background: '#f9fafb',
      border: `1px solid ${selected ? '#5b6af0' : '#e5e7eb'}`,
      borderRadius: '8px',
      boxShadow: selected ? '0 0 0 2px rgba(91,106,240,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
      minWidth: '180px',
      overflow: 'hidden',
      transition: 'all 0.1s ease',
    }}>
      
      {nodeDef.hi && (
        <Handle 
          type="target" 
          position={Position.Left} 
          style={{ left: '-6px', background: '#fff' }}
        />
      )}

      {/* Node Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        background: nodeDef.col,
        color: '#ffffff'
      }}>
        <IconComponent size={14} />
        <span style={{ fontSize: '11px', textTransform: 'lowercase', letterSpacing: '0.02em', fontWeight: 600 }}>
          {nodeDef.lbl}
        </span>
      </div>
      
      {/* Node Body */}
      <div style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 600, color: '#1f2937', minHeight: '40px' }}>
        {data.lbl}
      </div>

      {nodeDef.ho && (
        <Handle 
          type="source" 
          position={Position.Right} 
          style={{ right: '-6px', background: '#fff' }}
        />
      )}
    </div>
  );
}
