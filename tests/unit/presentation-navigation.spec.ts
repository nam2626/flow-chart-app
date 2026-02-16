import { describe, expect, it } from 'vitest';
import { seedThreeLabeledSteps } from '../helpers/presentation-fixture';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation navigation', () => {
  it('다음/이전 단계 이동을 처리한다', () => {
    seedThreeLabeledSteps();
    const store = useFlowchartStore.getState();
    store.startPresentation();
    store.nextPresentationStep();
    expect(useFlowchartStore.getState().presentation.currentOrder).toBe(2);

    store.prevPresentationStep();
    expect(useFlowchartStore.getState().presentation.currentOrder).toBe(1);
  });
});
