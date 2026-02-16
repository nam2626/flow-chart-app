import { describe, expect, it } from 'vitest';
import { buildCenterConnectorPath, isConnectorOverlapFree } from '@features/flowchart/services/center-connector-service';
import { computeVerticalFlexLayout } from '@features/flowchart/services/arrow-geometry-service';
import { buildCenterConnectorNodes, buildVariableHeightNodes } from '../helpers/center-connector-fixture';

describe('center connector', () => {
  it('builds center-to-center connector path', () => {
    const [fromNode, toNode] = buildCenterConnectorNodes();
    const path = buildCenterConnectorPath(fromNode, toNode);

    expect(path.startCenterX).toBe(fromNode.x + fromNode.width / 2);
    expect(path.startCenterY).toBe(fromNode.y + fromNode.height / 2);
    expect(path.endCenterX).toBe(toNode.x + toNode.width / 2);
    expect(path.endCenterY).toBe(toNode.y + toNode.height / 2);
  });

  it('keeps nodes overlap-free after auto vertical layout', () => {
    const nodes = buildVariableHeightNodes();
    const positioned = computeVerticalFlexLayout(nodes, 320).nodes;

    expect(isConnectorOverlapFree(positioned[0], positioned[1])).toBe(true);
    expect(isConnectorOverlapFree(positioned[1], positioned[2])).toBe(true);
  });
});
