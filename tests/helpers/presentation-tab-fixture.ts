import type { FlowNode, PresentationSession } from '@features/flowchart/models/flowchart-types';
import { createFlowNodeFixture } from './flowchart-fixture';

export function buildPresentationTabNodes(): FlowNode[] {
  return [
    createFlowNodeFixture(1, 'rectangle', '문제 정의'),
    createFlowNodeFixture(2, 'ellipse', '분석'),
    createFlowNodeFixture(3, 'rectangle', '결론')
  ];
}

export function buildPresentationSessionFixture(): PresentationSession {
  return {
    isRunning: true,
    currentOrder: 2,
    startedAt: '2026-02-16T00:00:00.000Z',
    endedAt: null,
    openedInNewTab: true,
    blockedReason: null
  };
}
