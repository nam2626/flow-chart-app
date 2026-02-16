import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function seedPresentationReadyState(): void {
  useFlowchartStore.setState(useFlowchartStore.getInitialState());
  const store = useFlowchartStore.getState();
  store.addNode('rectangle');
  store.addNode('ellipse');

  const nodes = useFlowchartStore.getState().nodes;
  useFlowchartStore.getState().updateNodeLabel(nodes[0].nodeId, '문제 정의');
  useFlowchartStore.getState().updateNodeLabel(nodes[1].nodeId, '해결 방안');
}
