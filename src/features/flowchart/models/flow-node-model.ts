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

export function createFlowNode(diagramId: string, input: CreateNodeInput): FlowNode {
  return {
    nodeId: newId(),
    diagramId,
    isActive: false,
    ...input
  };
}
