import { describe, expect, it } from 'vitest';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';
import { buildArrowSegment } from '@features/flowchart/services/arrow-geometry-service';

describe('arrow boundary geometry', () => {
  it('starts from source boundary and ends before target boundary', () => {
    const from = createFlowNodeFixture(1, 'rectangle', 'A');
    const to = createFlowNodeFixture(2, 'rectangle', 'B');

    const segment = buildArrowSegment(from, to);

    expect(segment.x1).toBe(from.x + from.width / 2);
    expect(segment.x2).toBe(to.x + to.width / 2);
    expect(segment.y1).toBe(from.y + from.height);
    expect(segment.y2).toBeLessThan(to.y);
    expect(Math.round(to.y - segment.y2)).toBe(4);
  });

  it('supports ellipse target boundary with offset', () => {
    const from = createFlowNodeFixture(1, 'rectangle', 'A');
    const to = createFlowNodeFixture(2, 'ellipse', 'B');

    const segment = buildArrowSegment(from, to);

    expect(segment.x1).toBe(from.x + from.width / 2);
    expect(segment.x2).toBe(to.x + to.width / 2);
    expect(segment.y2).toBeLessThan(to.y + to.height);
  });
});
