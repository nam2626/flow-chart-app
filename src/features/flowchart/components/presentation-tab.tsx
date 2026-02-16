import React from 'react';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';

interface PresentationTabProps {
  nodes: FlowNode[];
  canvasWidthPx: number;
}

export function PresentationTab({ nodes, canvasWidthPx }: PresentationTabProps): JSX.Element {
  // 프레젠테이션 탭도 편집 화면과 동일한 플로우 컨테이너 정책을 재사용한다.
  return (
    <main aria-label="presentation-tab-view" data-testid="presentation-tab-view">
      <PresentationMode nodes={nodes} canvasWidthPx={canvasWidthPx} />
    </main>
  );
}
