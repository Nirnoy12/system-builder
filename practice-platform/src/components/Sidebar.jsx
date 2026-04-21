import React from 'react';
import { 
  LogIn, BoxSelect, Database, GitBranch, Share2, 
  RefreshCw, Wrench, BrainCircuit, UserCog, AlignLeft, 
  ShieldAlert, RotateCcw, Code, GitMerge, FileText,
  BookOpen, ChevronRight
} from 'lucide-react';
import { NODE_TYPES } from '../constants';

// Map icon strings or ids to actual Lucide components
const iconMap = {
  input: LogIn,
  llm: BoxSelect,
  know: Database,
  class: GitBranch,
  cond: Share2,
  loop: RefreshCw,
  tool: Wrench,
  mem: BrainCircuit,
  hand: UserCog,
  fmt: AlignLeft,
  guard: ShieldAlert,
  retry: RotateCcw,
  code: Code,
  merge: GitMerge,
  note: FileText,
};

export function Sidebar({ onDragStart, onOpenBrief }) {
  return (
    <aside className="sidebar">
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <div 
          onClick={onOpenBrief}
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
            cursor: 'pointer',
            background: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
            <BookOpen size={12} /> Brief
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Challenge Brief
          </div>
        </div>
      </div>
      
      <div className="sidebar-section" style={{ paddingTop: '12px' }}>Node Palette</div>
      <div className="node-list">
        {NODE_TYPES.map((node) => {
          const IconComponent = iconMap[node.id] || FileText;
          return (
            <div
              key={node.id}
              className="palette-node"
              draggable
              onDragStart={(e) => onDragStart(e, node.id)}
            >
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '6px', 
                backgroundColor: node.col,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
              }}>
                <IconComponent size={14} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>{node.lbl}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export function getIconForType(typeId) {
  return iconMap[typeId] || FileText;
}
