import type { FlowNode, ShapeType } from '@features/flowchart/models/flowchart-types';

export function createFlowNodeFixture(stepOrder: number, shapeType: ShapeType = 'rectangle', label?: string): FlowNode {
  return {
    nodeId: `node-${stepOrder}`,
    diagramId: 'diagram-test',
    shapeType,
    label: label ?? `단계 ${stepOrder}`,
    stepOrder,
    x: 40,
    y: 24 + (stepOrder - 1) * 142,
    width: 240,
    height: 90,
    isActive: false
  };
}

export function createFlowNodesFixture(count: number): FlowNode[] {
  return Array.from({ length: count }, (_, idx) => createFlowNodeFixture(idx + 1, idx % 2 === 0 ? 'rectangle' : 'ellipse'));
}
