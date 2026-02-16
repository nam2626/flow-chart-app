import { describe, expect, it } from 'vitest';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';
import { buildSvgFromNodes } from '@features/flowchart/services/svg-export-service';

describe('transparent background integration', () => {
  it('SVG 출력에서 배경이 투명해야 한다', () => {
    const svg = buildSvgFromNodes({
      nodes: [createFlowNodeFixture(1, 'rectangle', '배경 테스트')],
      width: 320
    });
    expect(svg.includes('fill="transparent"')).toBe(true);
  });
});
