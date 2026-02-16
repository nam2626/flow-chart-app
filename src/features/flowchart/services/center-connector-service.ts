import type { CenterConnectorPath, FlowNode } from '@features/flowchart/models/flowchart-types';

function toCenter(node: FlowNode): { x: number; y: number } {
  return {
    x: node.x + node.width / 2,
    y: node.y + node.height / 2
  };
}

export function buildCenterConnectorPath(fromNode: FlowNode, toNode: FlowNode): CenterConnectorPath {
  const fromCenter = toCenter(fromNode);
  const toCenterPoint = toCenter(toNode);

  // 정렬 기준의 근거를 추적하기 위해 중심 좌표를 명시적으로 저장한다.
  return {
    fromNodeId: fromNode.nodeId,
    toNodeId: toNode.nodeId,
    startCenterX: fromCenter.x,
    startCenterY: fromCenter.y,
    endCenterX: toCenterPoint.x,
    endCenterY: toCenterPoint.y
  };
}

export function buildCenterConnectorPaths(nodes: FlowNode[]): CenterConnectorPath[] {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  if (sorted.length < 2) {
    return [];
  }

  return sorted.slice(0, -1).map((fromNode, index) => buildCenterConnectorPath(fromNode, sorted[index + 1]));
}
