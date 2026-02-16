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
    <label>
      캔버스 가로 폭
      <input
        aria-label="canvas-width-input"
        type="number"
        min={300}
        max={400}
        value={width}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginLeft: '8px', width: '100px' }}
      />
      <span style={{ marginLeft: '8px', fontSize: '12px', color: '#4b5563' }}>{message}</span>
    </label>
  );
}
