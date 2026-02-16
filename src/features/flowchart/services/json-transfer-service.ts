import { IMPORT_SIZE_MAX } from '@features/flowchart/services/flowchart-validation';
import { exportDiagramSvg as exportSvgCore, type ExportResult } from '@features/flowchart/services/svg-export-service';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';

export type ConflictResolution = 'imported_precedence' | 'keep_existing' | 'custom';

export function resolveImportConflict(
  existingValue: Record<string, unknown>,
  importedValue: Record<string, unknown>,
  resolution: ConflictResolution
): Record<string, unknown> {
  if (resolution === 'keep_existing') {
    return existingValue;
  }
  if (resolution === 'custom') {
    return { ...existingValue, ...importedValue };
  }
  return importedValue;
}

export function exportDiagramJson(payload: unknown, title = 'flowchart'): string {
  const json = JSON.stringify(payload, null, 2);
  if (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof URL !== 'undefined' &&
    typeof URL.createObjectURL === 'function'
  ) {
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return json;
}

export function exportDiagramSvg(input: { nodes: FlowNode[]; width: number; title?: string }): ExportResult {
  return exportSvgCore(input);
}

export function parseImportJson(fileContent: string, bytes: number): unknown {
  if (bytes > IMPORT_SIZE_MAX) {
    throw new Error('FILE_TOO_LARGE');
  }
  return JSON.parse(fileContent);
}
