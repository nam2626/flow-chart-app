import { describe, expect, it } from 'vitest';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('US1 persistence', () => {
  it('노드를 생성하면 상태에 남는다', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    const store = useFlowchartStore.getState();
    store.addNode('rectangle');
    store.addNode('ellipse');
    expect(useFlowchartStore.getState().nodes.length).toBeGreaterThanOrEqual(2);
  });
});
