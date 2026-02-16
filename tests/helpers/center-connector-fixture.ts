import type { FlowNode } from '@features/flowchart/models/flowchart-types';
import { createFlowNodeFixture } from './flowchart-fixture';

export function buildCenterConnectorNodes(): [FlowNode, FlowNode] {
  const from = createFlowNodeFixture(1, 'rectangle', '시작');
  const to = createFlowNodeFixture(2, 'ellipse', '다음');
  return [from, to];
}

export function buildFlexColumnCenteredNodes(): FlowNode[] {
  const first = { ...createFlowNodeFixture(1, 'rectangle', '첫 단계'), x: 40, y: 24 };
  const second = { ...createFlowNodeFixture(2, 'rectangle', '둘째 단계'), x: 40, y: 166 };
  const third = { ...createFlowNodeFixture(3, 'ellipse', '셋째 단계'), x: 40, y: 308 };
  return [first, second, third];
}

export function buildVariableHeightNodes(): FlowNode[] {
  const first = { ...createFlowNodeFixture(1, 'rectangle', '짧은 텍스트'), height: 90 };
  const second = {
    ...createFlowNodeFixture(2, 'rectangle', '두 번째 단계는 긴 텍스트를 포함해서 높이 계산이 달라져야 합니다.'),
    height: 130
  };
  const third = {
    ...createFlowNodeFixture(3, 'ellipse', '세 번째 단계도 길이를 늘려 간격 계산을 확인합니다.'),
    height: 110
  };
  return [first, second, third];
}
