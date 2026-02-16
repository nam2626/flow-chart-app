export interface BudgetResult {
  metric: string;
  valueMs: number;
  budgetMs: number;
  pass: boolean;
}

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

export function evaluateCenterXTolerance(actualX: number, expectedX: number, tolerancePx = 0): boolean {
  return Math.abs(actualX - expectedX) <= tolerancePx;
}
