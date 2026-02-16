import { createFlowNodeFixture } from './flowchart-fixture';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';

export function buildPngExportNodes(): FlowNode[] {
  return [
    createFlowNodeFixture(1, 'rectangle', '입력'),
    createFlowNodeFixture(2, 'ellipse', '처리'),
    createFlowNodeFixture(3, 'rectangle', '출력')
  ];
}
