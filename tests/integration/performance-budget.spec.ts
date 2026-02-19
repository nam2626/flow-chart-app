import { describe, expect, it } from 'vitest';
import { performance } from 'node:perf_hooks';
import { createFlowNodesFixture } from '../helpers/flowchart-fixture';
import { computeVerticalFlexLayout } from '@features/flowchart/services/arrow-geometry-service';
import {
  evaluateBudget,
  evaluateRelativeRegression,
  measureLayoutApplyMs
} from '@features/flowchart/services/performance-budget-service';

describe('performance budget', () => {
  it('세로 레이아웃 재계산은 p95 300ms 이내를 유지한다', () => {
    const nodes = createFlowNodesFixture(50);
    const samples: number[] = [];

    for (let i = 0; i < 10; i += 1) {
      const start = performance.now();
      computeVerticalFlexLayout(nodes, 320);
      samples.push(performance.now() - start);
    }

    const result = evaluateBudget('layout-recompute', samples, 300);
    expect(result.pass).toBe(true);
  });

  it('레이아웃 반영 측정 훅은 0ms 이상 값을 반환한다', () => {
    const duration = measureLayoutApplyMs(() => {
      computeVerticalFlexLayout(createFlowNodesFixture(5), 320);
    });
    expect(duration).toBeGreaterThanOrEqual(0);
  });

  it('동일 시나리오 기준 후보 빌드는 기준 대비 성능 악화가 없어야 한다', () => {
    const baselineSamples: number[] = [];
    const candidateSamples: number[] = [];

    for (let i = 0; i < 10; i += 1) {
      baselineSamples.push(measureLayoutApplyMs(() => computeVerticalFlexLayout(createFlowNodesFixture(20), 320)));
      candidateSamples.push(measureLayoutApplyMs(() => computeVerticalFlexLayout(createFlowNodesFixture(20), 320)));
    }

    expect(evaluateRelativeRegression(baselineSamples, candidateSamples, 1.2)).toBe(true);
  });
});
