import { IMPORT_SIZE_MAX } from '@features/flowchart/services/flowchart-validation';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';

export function guardImportSize(bytes: number): { ok: boolean; message: string } {
  if (bytes > IMPORT_SIZE_MAX) {
    return { ok: false, message: FLOW_MESSAGES.overSize };
  }
  return { ok: true, message: '' };
}
