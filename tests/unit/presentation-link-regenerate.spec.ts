import { beforeEach, describe, expect, it } from 'vitest';
import { createPresentationLink, regeneratePresentationLink, resolvePresentationLinkByCode } from '@features/flowchart/services/presentation-link-service';

describe('presentation link regenerate', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('invalidates previous code when regenerated', () => {
    const first = createPresentationLink('diagram-a', '제목', [], 320);
    const next = regeneratePresentationLink('diagram-a', '제목', [], 320);

    expect(resolvePresentationLinkByCode(first.shareCode)).toBeNull();
    expect(resolvePresentationLinkByCode(next.shareCode)?.diagramId).toBe('diagram-a');
  });
});
