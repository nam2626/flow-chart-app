import type { PresentationThemeId } from '@features/flowchart/models/flowchart-types';

export interface PresentationTheme {
  id: PresentationThemeId;
  nodeFill: string;
  nodeBorder: string;
  nodeText: string;
  arrowStroke: string;
  activeGlow: string;
  canvasBorder: string;
  containerBorderPolicy: 'NONE';
  canvasBackground: string;
  textSizeEm: number;
  baselineShadowBlurPx: number;
  baselineShadowSpreadPx: number;
  shadowOpacity: number;
}

export const PRESENTATION_TEXT_SIZE_EM = 1.3;
export const HIGHLIGHT_MULTIPLIER = 2;
const BASELINE_SHADOW_BLUR_PX = 8;
const BASELINE_SHADOW_SPREAD_PX = 2;
const SHADOW_OPACITY = 0.4;

export const presentationTheme: PresentationTheme = {
  id: 'presentation-redesign-v1',
  nodeFill: '#f0f7ff',
  nodeBorder: '#0f4c81',
  nodeText: '#0b1728',
  arrowStroke: '#0f4c81',
  activeGlow: `0 0 ${BASELINE_SHADOW_BLUR_PX * HIGHLIGHT_MULTIPLIER}px ${BASELINE_SHADOW_SPREAD_PX * HIGHLIGHT_MULTIPLIER}px rgba(15, 76, 129, ${SHADOW_OPACITY})`,
  canvasBorder: '#94a3b8',
  containerBorderPolicy: 'NONE',
  canvasBackground: 'transparent',
  textSizeEm: PRESENTATION_TEXT_SIZE_EM,
  baselineShadowBlurPx: BASELINE_SHADOW_BLUR_PX,
  baselineShadowSpreadPx: BASELINE_SHADOW_SPREAD_PX,
  shadowOpacity: SHADOW_OPACITY
};

function toLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.split('').map((c) => `${c}${c}`).join('') : raw;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = luminance(foregroundHex);
  const l2 = luminance(backgroundHex);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}
