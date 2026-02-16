import { describe, expect, it } from 'vitest';
import { createFlowNode } from '@features/flowchart/models/flow-node-model';

describe('flow-node creation', () => {
  it('사각형 노드를 생성한다', () => {
    const node = createFlowNode('d1', {
      shapeType: 'rectangle',
      label: 'A',
      stepOrder: 1,
      x: 0,
      y: 0,
      width: 100,
      height: 60
    });
    expect(node.shapeType).toBe('rectangle');
  });

  it('타원 노드를 생성한다', () => {
    const node = createFlowNode('d1', {
      shapeType: 'ellipse',
      label: 'B',
      stepOrder: 2,
      x: 10,
      y: 10,
      width: 120,
      height: 70
    });
    expect(node.shapeType).toBe('ellipse');
  });
});
