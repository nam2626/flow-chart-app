import React from 'react';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';
import { FlowLayoutStack } from '@features/flowchart/components/flow-layout-stack';

interface PresentationModeProps {
  nodes: FlowNode[];
  canvasWidthPx: number;
}

export function PresentationMode({ nodes, canvasWidthPx }: PresentationModeProps): JSX.Element {
  return (
    <section
      data-testid="presentation-mode-root"
      aria-label="presentation-mode"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <FlowLayoutStack mode="presentation" nodes={nodes} canvasWidthPx={canvasWidthPx} />
    </section>
  );
}
