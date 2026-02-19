export interface BudgetResult {
  metric: string;
  valueMs: number;
  budgetMs: number;
  pass: boolean;
}

export const PRESENTATION_ENTRY_P95_BUDGET_MS = 300;
export const PRESENTATION_STEP_P95_BUDGET_MS = 150;

export function measureDurationMs(run: () => void): number {
  const start = performance.now();
  run();
  return performance.now() - start;
}

export function percentile95(samples: number[]): number {
  if (samples.length === 0) {
    return 0;
  }
  const sorted = [...samples].sort((a, b) => a - b);
  const idx = Math.ceil(sorted.length * 0.95) - 1;
  return sorted[Math.max(0, idx)];
}

export function evaluateBudget(metric: string, samples: number[], budgetMs: number): BudgetResult {
  const p95 = percentile95(samples);
  return {
    metric,
    valueMs: p95,
    budgetMs,
    pass: p95 <= budgetMs
  };
}

export function evaluateRelativeRegression(
  baselineSamples: number[],
  candidateSamples: number[],
  allowedRatio = 1
): boolean {
  const baselineP95 = percentile95(baselineSamples);
  const candidateP95 = percentile95(candidateSamples);
  if (baselineP95 === 0) {
    return candidateP95 === 0;
  }
  return candidateP95 / baselineP95 <= allowedRatio;
}

export function evaluateCenterXTolerance(actualX: number, expectedX: number, tolerancePx = 0): boolean {
  return Math.abs(actualX - expectedX) <= tolerancePx;
}

// 레이아웃 재배치 시작부터 반영 완료까지를 동일 기준으로 측정하기 위한 공용 API.
export function measureLayoutApplyMs(run: () => void): number {
  return measureDurationMs(run);
}
