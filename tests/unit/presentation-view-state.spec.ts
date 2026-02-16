import { describe, expect, it } from 'vitest';
import { seedPresentationReadyState } from '../helpers/presentation-view-fixture';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation view state', () => {
  it('starts presentation from step 1 with active node', () => {
    seedPresentationReadyState();
    useFlowchartStore.getState().startPresentation();

    const state = useFlowchartStore.getState();
    expect(state.presentation.isRunning).toBe(true);
    expect(state.presentation.currentOrder).toBe(1);
    expect(state.nodes.find((node) => node.stepOrder === 1)?.isActive).toBe(true);
  });

  it('starts with same center line across all steps', () => {
    seedPresentationReadyState();
    useFlowchartStore.getState().startPresentation();

    const state = useFlowchartStore.getState();
    const centers = state.nodes
      .sort((a, b) => a.stepOrder - b.stepOrder)
      .map((node) => node.x + node.width / 2);
    expect(new Set(centers).size).toBe(1);
  });

  it('stops presentation and clears active node', () => {
    seedPresentationReadyState();
    useFlowchartStore.getState().startPresentation();
    useFlowchartStore.getState().stopPresentation();

    const state = useFlowchartStore.getState();
    expect(state.presentation.isRunning).toBe(false);
    expect(state.presentation.currentOrder).toBeNull();
    expect(state.nodes.every((node) => node.isActive === false)).toBe(true);
  });
});
