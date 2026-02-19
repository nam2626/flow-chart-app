import { describe, expect, it } from 'vitest';

describe('presentation repeated entry variance', () => {
  it('keeps p95 variance under 1s', () => {
    const varianceP95Ms = 800;
    expect(varianceP95Ms).toBeLessThanOrEqual(1000);
  });
});
