import { createFlowNodeFixture } from './flowchart-fixture';

export function buildLongTextStepLabel(): string {
  return '이 단계는 매우 긴 설명 텍스트를 포함하여 중앙 정렬과 연결선 정합성을 검증하기 위한 테스트 라벨입니다.';
}

export function buildLongTextNode() {
  return createFlowNodeFixture(1, 'rectangle', buildLongTextStepLabel());
}
