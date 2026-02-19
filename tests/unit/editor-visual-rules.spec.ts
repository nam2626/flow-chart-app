import { describe, expect, it } from 'vitest';
import { editorVisualRules } from '@features/flowchart/models/editor-visual-rules';

describe('editor visual rules tokens', () => {
  it('defines positive spacing and hierarchy values', () => {
    expect(editorVisualRules.spacing.sectionGapPx).toBeGreaterThan(0);
    expect(editorVisualRules.spacing.panelPaddingPx).toBeGreaterThan(0);
    expect(editorVisualRules.hierarchy.sectionHeadingSizePx).toBeGreaterThan(editorVisualRules.hierarchy.captionSizePx);
  });

  it('pins workspace alignment to center', () => {
    expect(editorVisualRules.alignment.workspaceAlign).toBe('center');
  });
});
