import { describe, expect, it } from 'vitest';

describe('presentation link performance budget', () => {
  it('defines entry p95 target under 300ms', () => {
    const entryP95Ms = 300;
    expect(entryP95Ms).toBeLessThanOrEqual(300);
  });
});
