import type { FlowNode } from '@features/flowchart/models/flowchart-types';

export interface PresentationSyncPayload {
  revisionId: string;
  nodes: FlowNode[];
  updatedAt: string;
}

const SNAPSHOT_KEY = 'flowchart-presentation-sync-v1';

export function writePresentationSyncSnapshot(payload: PresentationSyncPayload): void {
  window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(payload));
}

export function readPresentationSyncSnapshot(): PresentationSyncPayload | null {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as PresentationSyncPayload;
  } catch {
    return null;
  }
}

export function subscribePresentationSync(onSync: (payload: PresentationSyncPayload) => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key !== SNAPSHOT_KEY || !event.newValue) {
      return;
    }
    try {
      const payload = JSON.parse(event.newValue) as PresentationSyncPayload;
      onSync(payload);
    } catch {
      // 무시
    }
  };

  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener('storage', handler);
  };
}
