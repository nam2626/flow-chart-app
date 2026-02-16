import { describe, expect, it } from 'vitest';
import { createFlowNodesFixture } from '../helpers/flowchart-fixture';
import { exportPresentationPng } from '@features/flowchart/services/png-export-service';

describe('png feedback performance', () => {
  it('returns immediate validation failure under 700ms for invalid source', async () => {
    const nodes = createFlowNodesFixture(50);
    const begin = performance.now();
    const result = await exportPresentationPng({
      nodes,
      width: 320,
      sourceView: 'editor',
      title: 'flow'
    });
    const elapsed = performance.now() - begin;

    expect(result.ok).toBe(false);
    expect(elapsed).toBeLessThan(700);
  });
});
