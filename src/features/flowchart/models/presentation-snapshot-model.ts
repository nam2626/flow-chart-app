import type { FlowNode } from '@features/flowchart/models/flowchart-types';

export interface PresentationSnapshotModel {
  diagramId: string;
  revisionId: string;
  savedAt: string;
  nodes: FlowNode[];
}
