import { describe, expect, it } from 'vitest';
import { contrastRatio, presentationTheme } from '@features/flowchart/models/presentation-theme';

describe('presentation color contrast', () => {
  it('maintains WCAG AA contrast ratio >= 4.5:1 for node text', () => {
    const ratio = contrastRatio(presentationTheme.nodeText, presentationTheme.nodeFill);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
