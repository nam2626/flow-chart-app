import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';

export interface ProgressResult {
  currentStepOrder: number;
  isAtLastStep: boolean;
  message: string;
}

function sortOrders(stepOrders: number[]): number[] {
  return [...stepOrders].sort((a, b) => a - b);
}

export function getNextProgressState(stepOrders: number[], currentStep: number): ProgressResult {
  if (stepOrders.length === 0) {
    return { currentStepOrder: currentStep, isAtLastStep: true, message: FLOW_MESSAGES.noOrder };
  }

  const sorted = sortOrders(stepOrders);
  const currentIndex = sorted.findIndex((v) => v === currentStep);

  if (currentIndex < 0) {
    return { currentStepOrder: sorted[0], isAtLastStep: sorted.length === 1, message: FLOW_MESSAGES.movedNext };
  }

  const atLast = currentIndex >= sorted.length - 1;
  if (atLast) {
    return { currentStepOrder: sorted[currentIndex], isAtLastStep: true, message: FLOW_MESSAGES.lastStep };
  }

  return { currentStepOrder: sorted[currentIndex + 1], isAtLastStep: false, message: FLOW_MESSAGES.movedNext };
}

export function getPrevProgressState(stepOrders: number[], currentStep: number): ProgressResult {
  if (stepOrders.length === 0) {
    return { currentStepOrder: currentStep, isAtLastStep: true, message: FLOW_MESSAGES.noOrder };
  }

  const sorted = sortOrders(stepOrders);
  const currentIndex = sorted.findIndex((v) => v === currentStep);

  if (currentIndex <= 0) {
    return { currentStepOrder: sorted[0], isAtLastStep: sorted.length === 1, message: FLOW_MESSAGES.firstStep };
  }

  return { currentStepOrder: sorted[currentIndex - 1], isAtLastStep: false, message: FLOW_MESSAGES.movedPrev };
}

export function getValidCurrentStep(stepOrders: number[], preferred: number | null): number | null {
  if (stepOrders.length === 0) {
    return null;
  }
  const sorted = sortOrders(stepOrders);
  if (preferred === null) {
    return sorted[0];
  }
  if (sorted.includes(preferred)) {
    return preferred;
  }
  const next = sorted.find((v) => v > preferred);
  if (typeof next === 'number') {
    return next;
  }
  return sorted[sorted.length - 1];
}
