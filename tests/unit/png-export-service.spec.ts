import { describe, expect, it } from 'vitest';
import { buildPngExportNodes } from '../helpers/png-export-fixture';
import { exportPresentationPng } from '@features/flowchart/services/png-export-service';

describe('png export service', () => {
  it('fails when source view is not presentation', async () => {
    const result = await exportPresentationPng({
      nodes: buildPngExportNodes(),
      width: 320,
      sourceView: 'editor',
      title: 'flow'
    });

    expect(result.ok).toBe(false);
    expect(result.reasonCode).toBe('INVALID_SOURCE_VIEW');
  });

  it('fails when any node label is empty', async () => {
    const nodes = buildPngExportNodes();
    nodes[1].label = ' ';

    const result = await exportPresentationPng({
      nodes,
      width: 320,
      sourceView: 'presentation',
      title: 'flow'
    });

    expect(result.ok).toBe(false);
    expect(result.reasonCode).toBe('EMPTY_STEP_TEXT');
  });
});
