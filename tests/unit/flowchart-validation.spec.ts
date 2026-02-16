import { describe, expect, it } from 'vitest';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';
import {
  getExportValidationErrors,
  hasAllNodeLabels,
  hasVerticalOverlap,
  isAbsolutePositionForbidden,
  isAutoPositionLocked
} from '@features/flowchart/services/flowchart-validation';

describe('flowchart-validation', () => {
  it('모든 단계 텍스트가 채워졌는지 검증한다', () => {
    expect(hasAllNodeLabels([createFlowNodeFixture(1, 'rectangle', 'A')])).toBe(true);
    expect(hasAllNodeLabels([createFlowNodeFixture(1, 'rectangle', ' ')])).toBe(false);
  });

  it('내보내기 전 텍스트 누락 오류를 반환한다', () => {
    const errors = getExportValidationErrors([createFlowNodeFixture(1, 'rectangle', '')], 320);
    expect(errors.some((error) => error.includes('텍스트'))).toBe(true);
  });

  it('자동 배치 및 절대 배치 금지 정책을 강제한다', () => {
    expect(isAutoPositionLocked()).toBe(true);
    expect(isAbsolutePositionForbidden()).toBe(true);
  });

  it('세로 배치 겹침을 탐지한다', () => {
    const first = createFlowNodeFixture(1, 'rectangle', 'A');
    const second = { ...createFlowNodeFixture(2, 'rectangle', 'B'), y: first.y + 20 };

    expect(hasVerticalOverlap([first, second])).toBe(true);
  });
});
