import { describe, expect, it } from 'vitest';
import { performance } from 'node:perf_hooks';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

function seedFiftySteps(): void {
  useFlowchartStore.setState(useFlowchartStore.getInitialState());
  const store = useFlowchartStore.getState();
  for (let i = 0; i < 50; i += 1) {
    store.addNode(i % 2 === 0 ? 'rectangle' : 'ellipse');
  }
  const nodes = useFlowchartStore.getState().nodes;
  nodes.forEach((node, index) => {
    useFlowchartStore.getState().updateNodeLabel(node.nodeId, `단계 ${index + 1}`);
  });
}

describe('presentation performance integration', () => {
  it('50단계에서 삭제/초기화/이동이 각각 300ms 이내에 반영된다', () => {
    seedFiftySteps();
    const store = useFlowchartStore.getState();

    let start = performance.now();
    store.startPresentation();
    store.nextPresentationStep();
    const moveElapsed = performance.now() - start;

    start = performance.now();
    const currentNodes = useFlowchartStore.getState().nodes;
    store.removeNode(currentNodes[10].nodeId);
    const deleteElapsed = performance.now() - start;

    start = performance.now();
    store.resetAll();
    const resetElapsed = performance.now() - start;

    expect(moveElapsed).toBeLessThan(300);
    expect(deleteElapsed).toBeLessThan(300);
    expect(resetElapsed).toBeLessThan(300);
  });
});
