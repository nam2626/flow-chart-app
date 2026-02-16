import { beforeEach, describe, expect, it } from 'vitest';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation new tab open', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    const store = useFlowchartStore.getState();
    store.addNode('rectangle');
    store.updateNodeLabel(useFlowchartStore.getState().nodes[0].nodeId, '시작');
  });

  it('starts presentation when tab open is available', () => {
    globalThis.setWindowOpenMockResult(window);
    useFlowchartStore.getState().startPresentation();
    const state = useFlowchartStore.getState();
    expect(state.presentation.isRunning).toBe(true);
    expect(state.presentation.blockedReason).toBeNull();
  });

  it('cancels presentation and shows error when tab is blocked', () => {
    globalThis.setWindowOpenMockResult(null);
    useFlowchartStore.getState().startPresentation();
    const state = useFlowchartStore.getState();
    expect(state.presentation.isRunning).toBe(false);
    expect(state.progress.message).toContain('차단');
  });
});
