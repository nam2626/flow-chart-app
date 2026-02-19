import { describe, expect, it, vi } from 'vitest';
import { renderPresentationTab } from '@features/flowchart/services/presentation-tab-service';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';

function node(stepOrder: number): FlowNode {
  return {
    nodeId: `n-${stepOrder}`,
    diagramId: 'd1',
    shapeType: 'rectangle',
    label: `step-${stepOrder}`,
    stepOrder,
    x: 0,
    y: 0,
    width: 100,
    height: 60,
    isActive: false
  };
}

describe('presentation tab title', () => {
  it('renders html with provided title', () => {
    const written: string[] = [];
    const fakeWindow = {
      document: {
        open: vi.fn(),
        write: vi.fn((value: string) => written.push(value)),
        close: vi.fn()
      }
    } as unknown as Window;

    renderPresentationTab(fakeWindow, [node(1)], 1, '테스트 문서');
    expect(written.join('\n')).toContain('<title>테스트 문서</title>');
  });
});
