import { describe, expect, it } from 'vitest';
import { hasUniqueStepOrder } from '@features/flowchart/services/flowchart-validation';

describe('step order validation', () => {
  it('중복 없는 순서를 허용한다', () => {
    expect(hasUniqueStepOrder([1, 2, 3])).toBe(true);
  });

  it('중복 순서를 거부한다', () => {
    expect(hasUniqueStepOrder([1, 2, 2])).toBe(false);
  });
});
