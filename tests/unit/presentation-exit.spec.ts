import { describe, expect, it } from 'vitest';
import { seedThreeLabeledSteps } from '../helpers/presentation-fixture';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation exit', () => {
  it('종료 후 편집 상태를 유지하고 활성 강조를 해제한다', () => {
    seedThreeLabeledSteps();
    const store = useFlowchartStore.getState();
    store.startPresentation();
    store.nextPresentationStep();

    const labelsBefore = useFlowchartStore.getState().nodes.map((n) => n.label);
    store.stopPresentation();
    const state = useFlowchartStore.getState();

    expect(state.presentation.isRunning).toBe(false);
    expect(state.nodes.every((n) => n.isActive === false)).toBe(true);
    expect(state.nodes.map((n) => n.label)).toEqual(labelsBefore);
  });
});
