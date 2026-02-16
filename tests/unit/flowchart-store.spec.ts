import { beforeEach, describe, expect, it } from 'vitest';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('flowchart-store', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('초기 상태를 가진다', () => {
    const state = useFlowchartStore.getState();
    expect(state.diagram.canvasWidthPx).toBeGreaterThanOrEqual(300);
    expect(state.shortcut.nextStepKey).toBe('N');
  });

  it('노드를 추가할 수 있다', () => {
    const store = useFlowchartStore.getState();
    store.addNode('rectangle');
    expect(useFlowchartStore.getState().nodes.length).toBeGreaterThan(0);
  });

  it('순서 변경 시 즉시 재배치하고 stepOrder를 재정렬한다', () => {
    const store = useFlowchartStore.getState();
    store.addNode('rectangle');
    store.addNode('ellipse');
    const firstId = useFlowchartStore.getState().nodes.find((node) => node.stepOrder === 1)?.nodeId as string;

    store.updateStepOrder(firstId, 2);

    const sorted = [...useFlowchartStore.getState().nodes].sort((a, b) => a.stepOrder - b.stepOrder);
    expect(sorted[0].stepOrder).toBe(1);
    expect(sorted[1].stepOrder).toBe(2);
    expect(sorted[0].y + sorted[0].height).toBeLessThan(sorted[1].y);
  });
});
