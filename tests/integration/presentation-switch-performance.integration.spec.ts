import { describe, expect, it } from 'vitest';
import { createFlowNodesFixture } from '../helpers/flowchart-fixture';
import { buildArrowSegments } from '@features/flowchart/services/arrow-geometry-service';

describe('presentation switch performance', () => {
  it('computes 50-step segment geometry under 300ms budget', () => {
    const nodes = createFlowNodesFixture(50);
    const begin = performance.now();
    for (let i = 0; i < 10; i += 1) {
      buildArrowSegments(nodes);
    }
    const elapsed = performance.now() - begin;

    expect(elapsed).toBeLessThan(300);
  });
});
