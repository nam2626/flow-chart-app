import React from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function ProgressionBanner(): JSX.Element {
  const { progress, presentation, nodes } = useFlowchartStore();
  const total = nodes.length;
  const stepText = presentation.isRunning && presentation.currentOrder !== null ? ` (${presentation.currentOrder}/${total})` : '';

  return (
    <div aria-live="polite" style={{ marginTop: '8px', padding: '8px', border: '1px solid #d1d5db' }}>
      {progress.message}
      {stepText}
    </div>
  );
}
