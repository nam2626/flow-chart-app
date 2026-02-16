import { beforeEach, describe, expect, it } from 'vitest';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('shape style persist', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    localStorage.clear();
  });

  it('stores fill/border colors in persisted state', () => {
    const store = useFlowchartStore.getState();
    store.addNode('rectangle');
    const nodeId = useFlowchartStore.getState().nodes[0].nodeId;
    store.updateNodeColors(nodeId, '#dbeafe', '#1d4ed8');

    const raw = localStorage.getItem('flowchart-storage');
    expect(raw).toBeTruthy();
    expect(raw).toContain('#dbeafe');
    expect(raw).toContain('#1d4ed8');
  });
});
