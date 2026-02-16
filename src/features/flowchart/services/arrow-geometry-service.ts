import type { ArrowRenderSegment, FlowNode } from '@features/flowchart/models/flowchart-types';
import { ContractMap } from '@features/flowchart/services/contract-map';

interface Point {
  x: number;
  y: number;
}

function centerOf(node: FlowNode): Point {
  return { x: node.x + node.width / 2, y: node.y + node.height / 2 };
}

function boundaryPoint(node: FlowNode, toward: Point): Point {
  const c = centerOf(node);
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;

  if (dx === 0 && dy === 0) {
    return c;
  }

  if (node.shapeType === 'ellipse') {
    const rx = node.width / 2;
    const ry = node.height / 2;
    const k = 1 / Math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry));
    return { x: c.x + dx * k, y: c.y + dy * k };
  }

  const halfW = node.width / 2;
  const halfH = node.height / 2;
  const tx = Math.abs(dx) / halfW;
  const ty = Math.abs(dy) / halfH;
  const t = 1 / Math.max(tx, ty);
  return { x: c.x + dx * t, y: c.y + dy * t };
}

function offsetBeforeTarget(start: Point, targetBoundary: Point, offsetPx: number): Point {
  const vx = targetBoundary.x - start.x;
  const vy = targetBoundary.y - start.y;
  const len = Math.sqrt(vx * vx + vy * vy);

  if (len <= offsetPx || len === 0) {
    return targetBoundary;
  }

  const ux = vx / len;
  const uy = vy / len;
  return { x: targetBoundary.x - ux * offsetPx, y: targetBoundary.y - uy * offsetPx };
}

export function buildArrowSegment(fromNode: FlowNode, toNode: FlowNode): ArrowRenderSegment {
  const fromCenter = centerOf(fromNode);
  const toCenter = centerOf(toNode);
  const startBoundary = boundaryPoint(fromNode, toCenter);
  const targetBoundary = boundaryPoint(toNode, fromCenter);
  const endBoundary = offsetBeforeTarget(startBoundary, targetBoundary, ContractMap.presentation.arrowEndOffsetPx);

  return {
    fromNodeId: fromNode.nodeId,
    toNodeId: toNode.nodeId,
    x1: fromCenter.x,
    y1: startBoundary.y,
    x2: toCenter.x,
    y2: endBoundary.y,
    endOffsetPx: ContractMap.presentation.arrowEndOffsetPx
  };
}

export function buildArrowSegments(nodes: FlowNode[]): ArrowRenderSegment[] {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  if (sorted.length < 2) {
    return [];
  }
  return sorted.slice(0, -1).map((from, i) => buildArrowSegment(from, sorted[i + 1]));
}
