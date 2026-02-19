export type ShapeType = 'rectangle' | 'ellipse';

export interface FlowNode {
  nodeId: string;
  diagramId: string;
  shapeType: ShapeType;
  label: string;
  stepOrder: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isActive: boolean;
  fillColor?: string;
  borderColor?: string;
}

export interface FlowchartDiagram {
  diagramId: string;
  title: string;
  canvasWidthPx: number;
  isTransparentBackground: boolean;
  activeNodeId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StepProgressState {
  diagramId: string;
  currentStepOrder: number;
  isAtLastStep: boolean;
  message: string;
}

export interface PresentationSession {
  isRunning: boolean;
  currentOrder: number | null;
  startedAt: string | null;
  endedAt: string | null;
  openedInNewTab: boolean;
  blockedReason: string | null;
}

export interface CanvasSettings {
  widthPx: number;
  backgroundMode: 'transparent';
}

export interface ChartStateSnapshot {
  snapshotId: string;
  steps: FlowNode[];
  canvasSettings: CanvasSettings;
  capturedAt: string;
}

export interface ShortcutPreference {
  diagramId: string;
  nextStepKey: string;
  updatedAt: string;
}

export interface PresentationLinkMetadata {
  shareCode: string | null;
  status: 'active' | 'revoked' | null;
  generatedAt: string | null;
  regeneratedAt: string | null;
}

export interface ImportMergeConflict {
  conflictId: string;
  diagramId: string;
  conflictType: 'node_id' | 'step_order';
  existingValue: Record<string, unknown>;
  importedValue: Record<string, unknown>;
  resolution: 'imported_precedence' | 'keep_existing' | 'custom';
}

export type PresentationThemeId = 'presentation-redesign-v1';

export interface ArrowRenderSegment {
  fromNodeId: string;
  toNodeId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  endOffsetPx: number;
}

export interface CenterConnectorPath {
  fromNodeId: string;
  toNodeId: string;
  startCenterX: number;
  startCenterY: number;
  endCenterX: number;
  endCenterY: number;
}

export type VerticalDirection = 'TOP_TO_BOTTOM';
export type CrossAxisAlign = 'CENTER';
export type StackMode = 'AUTO_ONLY';
export type PositionPolicy = 'FLOW_ONLY';
export type HeightPolicy = 'EXPAND_WITH_CONTENT';

export interface LayoutItemState {
  shapeId: string;
  order: number;
  centerX: number;
  topY: number;
  width: number;
  height: number;
  gapAfter: number;
}

export interface VerticalLayoutState {
  layoutId: string;
  direction: VerticalDirection;
  crossAxisAlign: CrossAxisAlign;
  stackMode: StackMode;
  positionPolicy: PositionPolicy;
  heightPolicy: HeightPolicy;
  items: LayoutItemState[];
  computedAt: number;
}

export interface ConnectorFlowRow {
  rowId: string;
  fromShapeId: string;
  toShapeId: string;
  centerX: number;
  rowTopY: number;
  rowHeight: number;
  usesAbsolute: false;
}

export const CENTER_CONNECTOR_RULE = 'CENTER_X_WITH_BOUNDARY_Y' as const;
export const CENTER_X_TOLERANCE_PX = 0 as const;

export type PngExportReasonCode = 'EMPTY_STEP_TEXT' | 'EMPTY_DIAGRAM' | 'INVALID_SOURCE_VIEW' | 'RENDER_FAILED';

export interface FlowchartState {
  diagram: FlowchartDiagram;
  nodes: FlowNode[];
  progress: StepProgressState;
  presentation: PresentationSession;
  presentationLink: PresentationLinkMetadata;
  lastSnapshot: ChartStateSnapshot | null;
  shortcut: ShortcutPreference;
}
