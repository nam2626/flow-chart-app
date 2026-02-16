import { describe, expect, it } from 'vitest';
import { getNextProgressState } from '@features/flowchart/services/progression-service';

describe('progression state', () => {
  it('다음 단계로 이동한다', () => {
    const next = getNextProgressState([1, 2, 3], 1);
    expect(next.currentStepOrder).toBe(2);
  });

  it('마지막 단계에서 유지한다', () => {
    const next = getNextProgressState([1, 2, 3], 3);
    expect(next.currentStepOrder).toBe(3);
    expect(next.isAtLastStep).toBe(true);
  });
});
