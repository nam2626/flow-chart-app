import { describe, expect, it } from 'vitest';
import { seedThreeLabeledSteps } from '../helpers/presentation-fixture';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('reset defaults', () => {
  it('전체 초기화 시 도형/프레젠테이션/캔버스를 기본값으로 복원한다', () => {
    seedThreeLabeledSteps();
    const store = useFlowchartStore.getState();
    store.setCanvasWidth(400);
    store.startPresentation();

    useFlowchartStore.getState().resetAll();
    const state = useFlowchartStore.getState();

    expect(state.nodes).toHaveLength(0);
    expect(state.diagram.canvasWidthPx).toBe(320);
    expect(state.presentation.isRunning).toBe(false);
    expect(state.presentation.currentOrder).toBeNull();
  });
});
