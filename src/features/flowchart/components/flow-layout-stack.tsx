import React, { useMemo } from 'react';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';
import { presentationTheme } from '@features/flowchart/models/presentation-theme';
import { buildConnectorFlowRows } from '@features/flowchart/services/center-connector-service';

interface FlowLayoutStackProps {
  nodes: FlowNode[];
  mode: 'edit' | 'presentation';
  canvasWidthPx: number;
  onLabelChange?: (nodeId: string, label: string) => void;
  onColorChange?: (nodeId: string, fillColor: string, borderColor: string) => void;
  onDelete?: (nodeId: string) => void;
}

function renderConnector(mode: 'edit' | 'presentation', rowHeight: number, testId: string): JSX.Element {
  const stroke = mode === 'presentation' ? presentationTheme.arrowStroke : '#334155';
  const markerFill = mode === 'presentation' ? presentationTheme.arrowStroke : '#334155';

  return (
    <div
      data-testid={testId}
      style={{
        height: `${rowHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <div style={{ width: '2px', height: `${Math.max(8, rowHeight - 10)}px`, background: stroke }} />
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: `10px solid ${markerFill}`
        }}
      />
    </div>
  );
}

export function FlowLayoutStack({ nodes, mode, canvasWidthPx, onLabelChange, onColorChange, onDelete }: FlowLayoutStackProps): JSX.Element {
  const sortedNodes = useMemo(() => [...nodes].sort((a, b) => a.stepOrder - b.stepOrder), [nodes]);
  const connectorRows = useMemo(() => buildConnectorFlowRows(sortedNodes), [sortedNodes]);

  return (
    <div
      data-testid={mode === 'presentation' ? 'presentation-flow-container' : 'edit-flow-container'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: `${canvasWidthPx}px`,
        // 프레젠테이션에서는 시선 분산을 막기 위해 컨테이너 테두리를 항상 제거한다.
        border: mode === 'presentation' ? 'none' : '1px dashed #9ca3af',
        background: mode === 'presentation' ? presentationTheme.canvasBackground : 'transparent',
        padding: '24px 0 32px 0',
        minHeight: mode === 'presentation' ? '320px' : undefined
      }}
    >
      {sortedNodes.map((node, index) => (
        <React.Fragment key={node.nodeId}>
          {mode === 'presentation' ? (
            <div
              data-testid={`presentation-node-${node.stepOrder}`}
              style={{
                width: node.width,
                minHeight: node.height,
                borderRadius: node.shapeType === 'ellipse' ? '50%' : '8px',
                border: `2px solid ${node.borderColor ?? presentationTheme.nodeBorder}`,
                background: node.fillColor ?? presentationTheme.nodeFill,
                color: presentationTheme.nodeText,
                boxShadow: node.isActive ? presentationTheme.activeGlow : 'none',
                display: 'grid',
                placeItems: 'center',
                padding: '10px',
                textAlign: 'center',
                fontSize: `${presentationTheme.textSizeEm}em`
              }}
            >
              <span>{node.label}</span>
            </div>
          ) : (
            <div
              data-node-id={node.nodeId}
              style={{
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
                padding: '10px',
                borderRadius: node.shapeType === 'ellipse' ? '50%' : '8px'
              }}
              title={`단계 ${node.stepOrder}`}
            >
              <label style={{ fontSize: '12px' }}>단계 {node.stepOrder}</label>
              <input
                aria-label={`step-text-${node.stepOrder}`}
                value={node.label}
                onChange={(e) => onLabelChange?.(node.nodeId, e.target.value)}
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
                    onChange={(e) => onColorChange?.(node.nodeId, e.target.value, node.borderColor ?? '#1f2937')}
                  />
                </label>
                <label>
                  테두리
                  <input
                    aria-label={`border-color-${node.stepOrder}`}
                    type="color"
                    value={node.borderColor ?? '#1f2937'}
                    onChange={(e) => onColorChange?.(node.nodeId, node.fillColor ?? '#f0f7ff', e.target.value)}
                  />
                </label>
              </div>
              <button onClick={() => onDelete?.(node.nodeId)} style={{ fontSize: '12px' }}>
                단계 삭제
              </button>
            </div>
          )}

          {index < sortedNodes.length - 1
            ? renderConnector(
                mode,
                connectorRows[index]?.rowHeight ?? 40,
                `connector-row-${index + 1}`
              )
            : null}
        </React.Fragment>
      ))}
    </div>
  );
}
