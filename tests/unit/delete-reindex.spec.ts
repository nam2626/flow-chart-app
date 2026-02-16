import { describe, expect, it } from 'vitest';
import { seedThreeLabeledSteps } from '../helpers/presentation-fixture';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('delete reindex', () => {
  it('삭제 후 단계 순서를 1..N으로 재정렬한다', () => {
    seedThreeLabeledSteps();
    const before = useFlowchartStore.getState().nodes;
    useFlowchartStore.getState().removeNode(before[1].nodeId);

    const orders = useFlowchartStore.getState().nodes.map((n) => n.stepOrder);
    expect(orders).toEqual([1, 2]);
  });
});
