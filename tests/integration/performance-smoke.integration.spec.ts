import { describe, expect, it } from 'vitest';
import { performance } from 'node:perf_hooks';
import { createFlowNodesFixture } from '../helpers/flowchart-fixture';
import { buildSvgFromNodes } from '@features/flowchart/services/svg-export-service';
import { buildArrowSegments } from '@features/flowchart/services/arrow-geometry-service';

describe('performance smoke integration', () => {
  it('keeps 50-step SVG generation under 300ms', () => {
    const nodes = createFlowNodesFixture(50);
    const start = performance.now();
    buildSvgFromNodes({ nodes, width: 360 });
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(300);
  });

  it('keeps 50-shape connector alignment under 300ms', () => {
    const nodes = createFlowNodesFixture(50);
    const start = performance.now();
    buildArrowSegments(nodes);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(300);
  });
});
