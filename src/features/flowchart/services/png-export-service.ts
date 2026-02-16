import type { FlowNode, PngExportReasonCode } from '@features/flowchart/models/flowchart-types';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';
import { ContractMap } from '@features/flowchart/services/contract-map';
import { buildSvgFromNodes } from '@features/flowchart/services/svg-export-service';

export interface PngExportInput {
  nodes: FlowNode[];
  width: number;
  title?: string;
  sourceView: string;
}

export interface PngExportResult {
  ok: boolean;
  message: string;
  reasonCode?: PngExportReasonCode;
  fileName?: string;
}

function normalizeFileName(title?: string): string {
  const base = (title ?? 'flowchart').trim().toLowerCase().replace(/\s+/g, '-');
  return `${base || 'flowchart'}.png`;
}

function toFailure(reasonCode: PngExportReasonCode, message: string): PngExportResult {
  return { ok: false, reasonCode, message };
}

async function renderPngBlob(svg: string, width: number): Promise<Blob> {
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const imageUrl = URL.createObjectURL(svgBlob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('SVG_LOAD_FAILED'));
      img.src = imageUrl;
    });

    const ratio = image.height > 0 ? image.height / image.width : 1;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(width * ratio));

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('CANVAS_CONTEXT_UNAVAILABLE');
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (!result) {
          reject(new Error('PNG_ENCODE_FAILED'));
          return;
        }
        resolve(result);
      }, 'image/png');
    });

    return blob;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export async function exportPresentationPng(input: PngExportInput): Promise<PngExportResult> {
  if (input.sourceView !== ContractMap.export.sourceView) {
    return toFailure('INVALID_SOURCE_VIEW', ContractMap.export.invalidSourceView);
  }

  if (input.nodes.length === 0) {
    return toFailure('EMPTY_DIAGRAM', ContractMap.export.emptyDiagram);
  }

  if (!input.nodes.every((node) => node.label.trim().length > 0)) {
    return toFailure('EMPTY_STEP_TEXT', ContractMap.export.emptyStepText);
  }

  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof URL === 'undefined') {
    return toFailure('RENDER_FAILED', FLOW_MESSAGES.pngExportFailed);
  }

  try {
    const svg = buildSvgFromNodes({ nodes: input.nodes, width: input.width, title: input.title });
    const pngBlob = await renderPngBlob(svg, input.width);
    const downloadUrl = URL.createObjectURL(pngBlob);
    const fileName = normalizeFileName(input.title);

    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(downloadUrl);

    return {
      ok: true,
      message: FLOW_MESSAGES.pngExportSuccess,
      fileName
    };
  } catch {
    return toFailure('RENDER_FAILED', FLOW_MESSAGES.pngExportFailed);
  }
}
