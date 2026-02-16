import { describe, expect, it } from 'vitest';
import { seedOneUnlabeledStep, seedThreeLabeledSteps } from '../helpers/presentation-fixture';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';

describe('presentation start', () => {
  it('텍스트가 비어있으면 시작하지 않고 안내 메시지를 표시한다', () => {
    seedOneUnlabeledStep();
    useFlowchartStore.getState().startPresentation();
    const state = useFlowchartStore.getState();
    expect(state.presentation.isRunning).toBe(false);
    expect(state.progress.message).toBe(FLOW_MESSAGES.presentationUnavailable);
  });

  it('유효한 단계가 있으면 첫 단계부터 시작한다', () => {
    seedThreeLabeledSteps();
    useFlowchartStore.getState().startPresentation();
    const state = useFlowchartStore.getState();
    expect(state.presentation.isRunning).toBe(true);
    expect(state.presentation.currentOrder).toBe(1);
    expect(state.nodes.find((n) => n.stepOrder === 1)?.isActive).toBe(true);
  });
});
