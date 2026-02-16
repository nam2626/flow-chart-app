import { describe, expect, it } from 'vitest';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';
import { buildSvgFromNodes, exportDiagramSvg } from '@features/flowchart/services/svg-export-service';

describe('svg-export-service', () => {
  it('유효 차트는 SVG를 생성한다', () => {
    const result = exportDiagramSvg({
      nodes: [createFlowNodeFixture(1, 'rectangle', '시작'), createFlowNodeFixture(2, 'ellipse', '종료')],
      width: 320,
      title: 'sample'
    });
    expect(result.ok).toBe(true);
    expect(result.svg?.startsWith('<svg')).toBe(true);
  });

  it('텍스트 누락 시 실패 메시지를 반환한다', () => {
    const result = exportDiagramSvg({
      nodes: [createFlowNodeFixture(1, 'rectangle', '')],
      width: 320
    });
    expect(result.ok).toBe(false);
    expect(result.message).toContain('텍스트');
  });

  it('SVG 내부에 화살표 선을 포함한다', () => {
    const svg = buildSvgFromNodes({
      nodes: [createFlowNodeFixture(1, 'rectangle', 'A'), createFlowNodeFixture(2, 'ellipse', 'B')],
      width: 320
    });
    expect(svg.includes('marker-end="url(#arrow)"')).toBe(true);
  });
});
