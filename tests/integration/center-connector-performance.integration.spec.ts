import { describe, expect, it } from 'vitest';
import { createFlowNodesFixture } from '../helpers/flowchart-fixture';
import { buildCenterConnectorPaths } from '@features/flowchart/services/center-connector-service';
import { computeVerticalFlexLayout } from '@features/flowchart/services/arrow-geometry-service';

describe('center connector performance', () => {
  it('recomputes 50-shape layout and connector paths within 300ms budget (p95 smoke)', () => {
    const baseNodes = createFlowNodesFixture(50);
    const samples: number[] = [];
    for (let i = 0; i < 10; i += 1) {
      const start = performance.now();
      const laidOut = computeVerticalFlexLayout(baseNodes, 320).nodes;
      buildCenterConnectorPaths(laidOut);
      samples.push(performance.now() - start);
    }
    const sorted = samples.slice().sort((a, b) => a - b);
    const p95 = sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1)];
    expect(p95).toBeLessThan(300);
  });
});
