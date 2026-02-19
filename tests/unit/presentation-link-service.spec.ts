import { beforeEach, describe, expect, it } from 'vitest';
import {
  createPresentationLink,
  getPresentationLink,
  regeneratePresentationLink,
  resolvePresentationLinkByCode
} from '@features/flowchart/services/presentation-link-service';

describe('presentation link service', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('creates link and resolves by code', () => {
    const created = createPresentationLink('d1', '문서 제목');
    expect(created.shareCode.length).toBeGreaterThanOrEqual(6);
    expect(created.url).toContain('/p/');

    const loaded = getPresentationLink('d1');
    expect(loaded?.shareCode).toBe(created.shareCode);

    const resolved = resolvePresentationLinkByCode(created.shareCode);
    expect(resolved?.diagramId).toBe('d1');
  });

  it('regenerates link with a new code', () => {
    const first = createPresentationLink('d1', '문서 제목');
    const next = regeneratePresentationLink('d1', '문서 제목');
    expect(next.shareCode).not.toBe(first.shareCode);
  });
});
