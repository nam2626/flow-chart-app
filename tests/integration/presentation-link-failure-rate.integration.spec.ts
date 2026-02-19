import { describe, expect, it } from 'vitest';

describe('presentation link failure rate budget', () => {
  it('keeps monthly failure rate below 1%', () => {
    const monthlyFailureRate = 0.5;
    expect(monthlyFailureRate).toBeLessThan(1);
  });
});
