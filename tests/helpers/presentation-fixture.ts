import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function seedThreeLabeledSteps(): void {
  useFlowchartStore.setState(useFlowchartStore.getInitialState());
  const store = useFlowchartStore.getState();
  store.addNode('rectangle');
  store.addNode('ellipse');
  store.addNode('rectangle');

  const nodes = useFlowchartStore.getState().nodes;
  nodes.forEach((node, index) => {
    useFlowchartStore.getState().updateNodeLabel(node.nodeId, `단계 ${index + 1}`);
  });
}

export function seedOneUnlabeledStep(): void {
  useFlowchartStore.setState(useFlowchartStore.getInitialState());
  useFlowchartStore.getState().addNode('rectangle');
}
