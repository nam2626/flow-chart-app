import React from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function StepOrderPanel(): JSX.Element {
  const { nodes, updateStepOrder } = useFlowchartStore();
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);

  return (
    <section style={{ marginTop: '12px' }}>
      <h2>단계 순서 편집</h2>
      {sorted.map((node) => (
        <label key={node.nodeId} style={{ display: 'block', marginBottom: '6px' }}>
          {node.label || `단계 ${node.stepOrder}`}
          <input
            type="number"
            min={1}
            value={node.stepOrder}
            onChange={(e) => {
              // 순서 입력이 바뀌는 즉시 스토어 재배치를 트리거해 편집/프레젠테이션 정합성을 유지한다.
              const next = Math.max(1, Math.floor(Number(e.target.value) || 1));
              updateStepOrder(node.nodeId, next);
            }}
            style={{ marginLeft: '8px', width: '80px' }}
          />
        </label>
      ))}
    </section>
  );
}
