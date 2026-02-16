import { beforeEach, describe, expect, it } from 'vitest';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation tab performance', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    const store = useFlowchartStore.getState();
    for (let i = 0; i < 50; i += 1) {
      store.addNode(i % 2 === 0 ? 'rectangle' : 'ellipse');
    }
    useFlowchartStore.getState().nodes.forEach((node, idx) => {
      useFlowchartStore.getState().updateNodeLabel(node.nodeId, `단계 ${idx + 1}`);
    });
  });

  it('starts presentation within 300ms budget (p95 smoke)', () => {
    const samples: number[] = [];
    for (let i = 0; i < 10; i += 1) {
      const start = performance.now();
      useFlowchartStore.getState().startPresentation();
      useFlowchartStore.getState().stopPresentation();
      samples.push(performance.now() - start);
    }
    const sorted = samples.slice().sort((a, b) => a - b);
    const p95 = sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1)];
    expect(p95).toBeLessThan(300);
  });
});
