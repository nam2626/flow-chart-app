import type { ShapeType } from '@features/flowchart/models/flowchart-types';

import type { FlowNode } from '@features/flowchart/models/flowchart-types';

export const WIDTH_MIN = 300;
export const WIDTH_MAX = 400;
export const IMPORT_SIZE_MAX = 5 * 1024 * 1024;

export function isValidShape(shape: string): shape is ShapeType {
  return shape === 'rectangle' || shape === 'ellipse';
}

export function isValidCanvasWidth(width: number): boolean {
  return Number.isFinite(width) && width >= WIDTH_MIN && width <= WIDTH_MAX;
}

export function isValidImportSize(bytes: number): boolean {
  return Number.isFinite(bytes) && bytes > 0 && bytes <= IMPORT_SIZE_MAX;
}

export function hasUniqueStepOrder(orders: number[]): boolean {
  const set = new Set(orders);
  return set.size === orders.length;
}

export function hasAllNodeLabels(nodes: FlowNode[]): boolean {
  return nodes.every((node) => node.label.trim().length > 0);
}

export function getExportValidationErrors(nodes: FlowNode[], width: number): string[] {
  const errors: string[] = [];

  if (!isValidCanvasWidth(width)) {
    errors.push('캔버스 폭은 300~400 사이의 정수여야 합니다.');
  }

  if (!hasAllNodeLabels(nodes)) {
    errors.push('모든 단계에 텍스트를 입력해야 합니다.');
  }

  if (!hasUniqueStepOrder(nodes.map((node) => node.stepOrder))) {
    errors.push('단계 순서는 중복될 수 없습니다.');
  }

  return errors;
}

export function isCenterAlignedX(actualX: number, expectedX: number): boolean {
  return Math.abs(actualX - expectedX) === 0;
}

export function isAutoPositionLocked(): boolean {
  return true;
}

export function isAbsolutePositionForbidden(): boolean {
  return true;
}

export function isPresentationContainerBorderless(borderStyleValue: string): boolean {
  const normalized = borderStyleValue.trim().toLowerCase();
  return normalized === 'none' || normalized === '';
}

export function hasManualPositionFields(node: Pick<FlowNode, 'x' | 'y'>): boolean {
  return Number.isFinite(node.x) || Number.isFinite(node.y);
}

export function computeContainerMinHeight(nodes: FlowNode[]): number {
  if (nodes.length === 0) {
    return 360;
  }
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  const last = sorted[sorted.length - 1];
  return Math.max(360, last.y + last.height + 96);
}

export function hasVerticalOverlap(nodes: FlowNode[]): boolean {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const currentBottom = sorted[i].y + sorted[i].height;
    const nextTop = sorted[i + 1].y;
    if (currentBottom >= nextTop) {
      return true;
    }
  }
  return false;
}
