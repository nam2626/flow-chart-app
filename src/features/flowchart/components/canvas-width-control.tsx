import React, { useMemo } from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';
import { isValidCanvasWidth } from '@features/flowchart/services/flowchart-validation';

export function CanvasWidthControl(): JSX.Element {
  const width = useFlowchartStore((s) => s.diagram.canvasWidthPx);
  const setCanvasWidth = useFlowchartStore((s) => s.setCanvasWidth);
  const setProgressMessage = useFlowchartStore((s) => s.setProgressMessage);

  const message = useMemo(() => `허용 범위: 300~400px (현재 ${width}px)`, [width]);

  const onChange = (value: string) => {
    const parsed = Number(value);
    if (!isValidCanvasWidth(parsed)) {
      setProgressMessage(FLOW_MESSAGES.invalidCanvasWidth);
      return;
    }
    setCanvasWidth(parsed);
    setProgressMessage(FLOW_MESSAGES.idle);
  };

  return (
    <section
      aria-label="canvas-width-control"
      style={{
        display: 'grid',
        gap: '8px',
        minWidth: '300px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <strong style={{ fontSize: '16px' }}>Canvas Width</strong>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{`${width}px`}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
        <span>300px</span>
        <span>400px</span>
      </div>
      <input
        aria-label="canvas-width-slider"
        type="range"
        min={300}
        max={400}
        step={1}
        value={width}
        onChange={(e) => onChange(e.target.value)}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>Width</span>
        <input
          aria-label="canvas-width-input"
          type="number"
          min={300}
          max={400}
          value={width}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '84px' }}
        />
      </div>
      <span style={{ fontSize: '12px', color: '#4b5563' }}>{message}</span>
    </section>
  );
}
