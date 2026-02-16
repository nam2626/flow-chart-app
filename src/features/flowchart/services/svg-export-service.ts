import type { FlowNode } from '@features/flowchart/models/flowchart-types';
import { ContractMap } from '@features/flowchart/services/contract-map';
import { getExportValidationErrors } from '@features/flowchart/services/flowchart-validation';

interface ExportInput {
  nodes: FlowNode[];
  width: number;
  title?: string;
}

export interface ExportResult {
  ok: boolean;
  message: string;
  svg?: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getSortedNodes(nodes: FlowNode[]): FlowNode[] {
  return [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
}

export function buildSvgFromNodes(input: ExportInput): string {
  const sorted = getSortedNodes(input.nodes);
  const width = input.width;
  const itemHeight = 90;
  const itemGap = 52;
  const topPadding = 24;
  const left = Math.max(24, Math.floor(width / 2) - 120);
  const nodeWidth = 240;
  const height = Math.max(160, topPadding * 2 + sorted.length * itemHeight + Math.max(0, sorted.length - 1) * itemGap);

  const markers = [
    '<defs>',
    '<marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">',
    '<path d="M0,0 L0,6 L9,3 z" fill="#334155" />',
    '</marker>',
    '</defs>'
  ].join('');

  const arrows = sorted
    .slice(0, -1)
    .map((node, index) => {
      const startY = topPadding + index * (itemHeight + itemGap) + itemHeight;
      const endY = topPadding + (index + 1) * (itemHeight + itemGap);
      const x = left + nodeWidth / 2;
      return `<line x1="${x}" y1="${startY}" x2="${x}" y2="${endY}" stroke="#334155" stroke-width="2" marker-end="url(#arrow)" />`;
    })
    .join('');

  const nodes = sorted
    .map((node, index) => {
      const y = topPadding + index * (itemHeight + itemGap);
      const textY = y + itemHeight / 2 + 5;
      const label = escapeXml(node.label.trim());
      if (node.shapeType === 'ellipse') {
        const cx = left + nodeWidth / 2;
        const cy = y + itemHeight / 2;
        return `<ellipse cx="${cx}" cy="${cy}" rx="${nodeWidth / 2}" ry="${itemHeight / 2}" fill="transparent" stroke="#1f2937" stroke-width="2" /><text x="${cx}" y="${textY}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#111827">${label}</text>`;
      }
      return `<rect x="${left}" y="${y}" width="${nodeWidth}" height="${itemHeight}" rx="10" ry="10" fill="transparent" stroke="#1f2937" stroke-width="2" /><text x="${left + nodeWidth / 2}" y="${textY}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#111827">${label}</text>`;
    })
    .join('');

  const title = escapeXml(input.title ?? 'flowchart');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" data-title="${title}">${markers}${arrows}${nodes}</svg>`;
}

export function exportDiagramSvg(input: ExportInput): ExportResult {
  const errors = getExportValidationErrors(input.nodes, input.width);
  if (errors.length > 0) {
    const message = errors[0].includes('텍스트')
      ? ContractMap.export.emptyStepText
      : errors[0].includes('캔버스 폭')
        ? ContractMap.export.invalidCanvasWidth
        : ContractMap.export.unknown;
    return { ok: false, message };
  }

  const svg = buildSvgFromNodes(input);

  if (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof URL !== 'undefined' &&
    typeof URL.createObjectURL === 'function'
  ) {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(input.title ?? 'flowchart').replace(/\s+/g, '-').toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return { ok: true, message: 'SVG 내보내기가 완료되었습니다.', svg };
}
