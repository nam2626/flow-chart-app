import type { FlowNode, ShapeType } from '@features/flowchart/models/flowchart-types';
import { newId } from '@shared/utils/id-utils';

interface CreateNodeInput {
  shapeType: ShapeType;
  label: string;
  stepOrder: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ShapeLayoutSnapshot {
  shapeId: string;
  stepOrder: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ConnectorAlignmentState {
  fromShapeId: string;
  toShapeId: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  alignmentRule: 'CENTER_X_WITH_BOUNDARY_Y';
  xTolerancePx: 0;
}

export interface LayoutItemSnapshot {
  shapeId: string;
  order: number;
  centerX: number;
  topY: number;
  width: number;
  height: number;
  gapAfter: number;
}

export interface VerticalLayoutSnapshot {
  layoutId: string;
  direction: 'TOP_TO_BOTTOM';
  crossAxisAlign: 'CENTER';
  stackMode: 'AUTO_ONLY';
  positionPolicy: 'FLOW_ONLY';
  heightPolicy: 'EXPAND_WITH_CONTENT';
  items: LayoutItemSnapshot[];
  computedAt: number;
}

export interface ConnectorFlowRowSnapshot {
  rowId: string;
  fromShapeId: string;
  toShapeId: string;
  centerX: number;
  rowTopY: number;
  rowHeight: number;
  usesAbsolute: false;
}

export function createFlowNode(diagramId: string, input: CreateNodeInput): FlowNode {
  return {
    nodeId: newId(),
    diagramId,
    isActive: false,
    ...input
  };
}
