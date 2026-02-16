import React from 'react';
import { editorVisualRules } from '@features/flowchart/models/editor-visual-rules';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function StepOrderPanel(): JSX.Element {
  const { nodes, updateStepOrder } = useFlowchartStore();
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);

  return (
    <section style={{ marginTop: `${editorVisualRules.spacing.sectionGapPx}px` }}>
      <h2 style={{ fontSize: `${editorVisualRules.hierarchy.panelHeadingSizePx}px`, margin: '0 0 10px 0' }}>Layers/Steps</h2>
      {sorted.map((node) => (
        <div
          key={node.nodeId}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 70px',
            alignItems: 'center',
            marginBottom: `${editorVisualRules.spacing.blockGapPx}px`,
            background: '#fff',
            border: `1px solid ${editorVisualRules.colors.panelBorder}`,
            borderRadius: '8px',
            padding: '8px 10px'
          }}
        >
          <label>
            {node.label || `Step ${node.stepOrder}`}
            <input
              type="number"
              min={1}
              value={node.stepOrder}
              onChange={(e) => {
                // 순서 입력이 바뀌는 즉시 스토어 재배치를 트리거해 편집/프레젠테이션 정합성을 유지한다.
                const next = Math.max(1, Math.floor(Number(e.target.value) || 1));
                updateStepOrder(node.nodeId, next);
              }}
              style={{ marginLeft: '8px', width: '52px' }}
            />
          </label>
          <span style={{ fontSize: '12px', color: '#6b7280', textAlign: 'right' }}>{`#${node.stepOrder}`}</span>
        </div>
      ))}
    </section>
  );
}
