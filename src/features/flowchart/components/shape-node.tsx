import React from 'react';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';

interface ShapeNodeProps {
  node: FlowNode;
  onLabelChange: (nodeId: string, label: string) => void;
  onColorChange: (nodeId: string, fillColor: string, borderColor: string) => void;
  onDelete: (nodeId: string) => void;
}

export function ShapeNode({ node, onLabelChange, onColorChange, onDelete }: ShapeNodeProps): JSX.Element {
  const common: React.CSSProperties = {
    width: node.width,
    minHeight: node.height,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${node.borderColor ?? '#1f2937'}`,
    boxShadow: node.isActive ? '0 0 32px 8px rgba(34,197,94,0.7)' : 'none',
    background: node.fillColor ?? 'transparent',
    padding: '10px'
  };

  return (
    <div
      data-node-id={node.nodeId}
      style={{ ...common, borderRadius: node.shapeType === 'ellipse' ? '50%' : '8px' }}
      title={`단계 ${node.stepOrder}`}
    >
      <label style={{ fontSize: '12px' }}>단계 {node.stepOrder}</label>
      <input
        aria-label={`step-text-${node.stepOrder}`}
        value={node.label}
        onChange={(e) => onLabelChange(node.nodeId, e.target.value)}
        placeholder="단계 텍스트 입력"
        style={{ width: '90%' }}
      />
      <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
        <label>
          채움
          <input
            aria-label={`fill-color-${node.stepOrder}`}
            type="color"
            value={node.fillColor ?? '#f0f7ff'}
            onChange={(e) => onColorChange(node.nodeId, e.target.value, node.borderColor ?? '#1f2937')}
          />
        </label>
        <label>
          테두리
          <input
            aria-label={`border-color-${node.stepOrder}`}
            type="color"
            value={node.borderColor ?? '#1f2937'}
            onChange={(e) => onColorChange(node.nodeId, node.fillColor ?? '#f0f7ff', e.target.value)}
          />
        </label>
      </div>
      <button onClick={() => onDelete(node.nodeId)} style={{ fontSize: '12px' }}>
        단계 삭제
      </button>
    </div>
  );
}
