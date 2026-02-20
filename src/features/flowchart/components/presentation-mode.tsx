import React from 'react';
import type { FlowNode, PresentationShadowSettings } from '@features/flowchart/models/flowchart-types';
import { FlowLayoutStack } from '@features/flowchart/components/flow-layout-stack';

interface PresentationModeProps {
  nodes: FlowNode[];
  canvasWidthPx: number;
  shadowSettings?: PresentationShadowSettings;
}

export function PresentationMode({ nodes, canvasWidthPx, shadowSettings }: PresentationModeProps): JSX.Element {
  return (
    <section
      data-testid="presentation-mode-root"
      aria-label="presentation-mode"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        background: 'transparent'
      }}
    >
      <FlowLayoutStack mode="presentation" nodes={nodes} canvasWidthPx={canvasWidthPx} shadowSettings={shadowSettings} />
    </section>
  );
}
