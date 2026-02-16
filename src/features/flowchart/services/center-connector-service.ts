import type { CenterConnectorPath, ConnectorFlowRow, FlowNode } from '@features/flowchart/models/flowchart-types';

function toCenter(node: FlowNode): { x: number; y: number } {
  return {
    x: node.x + node.width / 2,
    y: node.y + node.height / 2
  };
}

export function buildCenterConnectorPath(fromNode: FlowNode, toNode: FlowNode): CenterConnectorPath {
  const fromCenter = toCenter(fromNode);
  const toCenterPoint = toCenter(toNode);

  // 중앙 정렬 규칙의 근거를 추적하기 위해 시작/종료 중심 좌표를 명시적으로 반환한다.
  return {
    fromNodeId: fromNode.nodeId,
    toNodeId: toNode.nodeId,
    startCenterX: fromCenter.x,
    startCenterY: fromCenter.y,
    endCenterX: toCenterPoint.x,
    endCenterY: toCenterPoint.y
  };
}

export function isConnectorOverlapFree(fromNode: FlowNode, toNode: FlowNode): boolean {
  const fromBottom = fromNode.y + fromNode.height;
  return fromBottom < toNode.y;
}

export function buildCenterConnectorPaths(nodes: FlowNode[]): CenterConnectorPath[] {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  if (sorted.length < 2) {
    return [];
  }

  return sorted.slice(0, -1).map((fromNode, index) => buildCenterConnectorPath(fromNode, sorted[index + 1]));
}

export function buildConnectorFlowRows(nodes: FlowNode[]): ConnectorFlowRow[] {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  if (sorted.length < 2) {
    return [];
  }

  return sorted.slice(0, -1).map((fromNode, index) => {
    const toNode = sorted[index + 1];
    const fromBottom = fromNode.y + fromNode.height;
    const rowTopY = fromBottom;
    const rowHeight = Math.max(24, toNode.y - fromBottom);

    return {
      rowId: `${fromNode.nodeId}-${toNode.nodeId}`,
      fromShapeId: fromNode.nodeId,
      toShapeId: toNode.nodeId,
      centerX: fromNode.x + fromNode.width / 2,
      rowTopY,
      rowHeight,
      usesAbsolute: false
    };
  });
}
