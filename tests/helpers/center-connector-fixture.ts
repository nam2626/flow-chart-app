import type { FlowNode } from '@features/flowchart/models/flowchart-types';
import { createFlowNodeFixture } from './flowchart-fixture';

export function buildCenterConnectorNodes(): [FlowNode, FlowNode] {
  const from = createFlowNodeFixture(1, 'rectangle', '시작');
  const to = createFlowNodeFixture(2, 'ellipse', '다음');
  return [from, to];
}
