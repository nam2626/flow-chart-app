import { describe, expect, it } from 'vitest';
import { createFlowNodesFixture } from '../helpers/flowchart-fixture';
import { buildArrowSegments } from '@features/flowchart/services/arrow-geometry-service';

describe('presentation arrow performance', () => {
  it('keeps boundary recalculation p95 budget under 300ms', () => {
    const nodes = createFlowNodesFixture(50);
    const samples: number[] = [];

    for (let i = 0; i < 10; i += 1) {
      const begin = performance.now();
      buildArrowSegments(nodes);
      samples.push(performance.now() - begin);
    }

    const sorted = [...samples].sort((a, b) => a - b);
    const p95 = sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1)];
    expect(p95).toBeLessThan(300);
  });
});
