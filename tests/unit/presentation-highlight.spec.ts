import { describe, expect, it } from 'vitest';
import {
  HIGHLIGHT_MULTIPLIER,
  presentationTheme,
  PRESENTATION_TEXT_SIZE_EM
} from '@features/flowchart/models/presentation-theme';

describe('presentation highlight style tokens', () => {
  it('keeps text size at 1.3em', () => {
    expect(presentationTheme.textSizeEm).toBe(PRESENTATION_TEXT_SIZE_EM);
    expect(presentationTheme.textSizeEm).toBe(1.3);
  });

  it('uses 2x blur/spread with unchanged opacity', () => {
    expect(presentationTheme.activeGlow).toContain(`${presentationTheme.baselineShadowBlurPx * HIGHLIGHT_MULTIPLIER}px`);
    expect(presentationTheme.activeGlow).toContain(`${presentationTheme.baselineShadowSpreadPx * HIGHLIGHT_MULTIPLIER}px`);
    expect(presentationTheme.activeGlow).toContain(`${presentationTheme.shadowOpacity}`);
  });
});
