import { describe, expect, it } from 'vitest';
import { getNextProgressState } from '@features/flowchart/services/progression-service';

describe('progression-service', () => {
  it('인접 단계로 정상 이동한다', () => {
    const next = getNextProgressState([1, 2, 3], 1);
    expect(next.currentStepOrder).toBe(2);
    expect(next.isAtLastStep).toBe(false);
  });

  it('마지막 단계에서는 더 이상 이동하지 않는다', () => {
    const next = getNextProgressState([1, 2], 2);
    expect(next.currentStepOrder).toBe(2);
    expect(next.isAtLastStep).toBe(true);
  });
});
