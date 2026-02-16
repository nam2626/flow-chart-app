import { describe, expect, it } from 'vitest';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';
import { exportDiagramJson, exportDiagramSvg } from '@features/flowchart/services/json-transfer-service';

describe('US3 import/export', () => {
  it('JSON과 SVG를 내보낼 수 있다', () => {
    const json = exportDiagramJson({ diagram: { title: 'x' }, nodes: [] });
    const svg = exportDiagramSvg({ nodes: [createFlowNodeFixture(1, 'rectangle', 'A')], width: 320 });
    expect(json.length).toBeGreaterThan(0);
    expect(svg.ok).toBe(true);
    expect(svg.svg?.startsWith('<svg')).toBe(true);
  });
});
