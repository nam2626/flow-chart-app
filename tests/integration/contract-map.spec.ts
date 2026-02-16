import { describe, expect, it } from 'vitest';
import { ContractMap } from '@features/flowchart/services/contract-map';

describe('contract-map', () => {
  it('캔버스 폭 제약이 계약과 일치한다', () => {
    expect(ContractMap.createDiagram.canvasWidthMin).toBe(300);
    expect(ContractMap.createDiagram.canvasWidthMax).toBe(400);
  });

  it('import 기본 해결 정책이 설정돼 있다', () => {
    expect(ContractMap.import.defaultResolution).toBe('imported_precedence');
  });

  it('connector validate contract uses center-x with boundary-y rule', () => {
    expect(ContractMap.presentation.centerConnectorRule).toBe('CENTER_X_WITH_BOUNDARY_Y');
    expect(ContractMap.presentation.arrowEndOffsetPx).toBe(4);
  });
});
