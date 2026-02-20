import { generateUniqueShareCode } from '@features/flowchart/services/presentation-link-code-service';
import type { PresentationLinkModel } from '@features/flowchart/models/presentation-link-model';
import type { FlowNode, PresentationShadowSettings } from '@features/flowchart/models/flowchart-types';
import { nowIso } from '@shared/utils/id-utils';

const STORAGE_KEY = 'flowchart-presentation-links-v1';

type LinkStore = Record<string, PresentationLinkModel>;

export interface PresentationSnapshotPayload {
  nodes: FlowNode[];
  canvasWidthPx: number;
  presentationShadow?: PresentationShadowSettings;
}

/**
 * URL 해시(#d=...)에서 스냅샷을 디코딩합니다.
 * OBS 브라우저 소스처럼 localStorage가 없는 외부 컨텍스트에서 사용됩니다.
 */
export function decodeSnapshotFromHash(hash: string): PresentationSnapshotPayload | null {
  try {
    if (!hash.startsWith('#d=')) return null;
    return JSON.parse(decodeURIComponent(hash.slice(3))) as PresentationSnapshotPayload;
  } catch {
    return null;
  }
}

function readStore(): LinkStore {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as LinkStore;
  } catch {
    return {};
  }
}

function writeStore(store: LinkStore): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function buildUrl(code: string, nodes: FlowNode[], canvasWidthPx: number, shadow?: PresentationShadowSettings): string {
  const payload: PresentationSnapshotPayload = { nodes, canvasWidthPx, ...(shadow ? { presentationShadow: shadow } : {}) };
  return `${window.location.origin}/p/${code}#d=${encodeURIComponent(JSON.stringify(payload))}`;
}

export interface PresentationLinkViewModel extends PresentationLinkModel {
  url: string;
}

export function getPresentationLink(diagramId: string, nodes: FlowNode[], canvasWidthPx: number, shadow?: PresentationShadowSettings): PresentationLinkViewModel | null {
  const store = readStore();
  const found = store[diagramId];
  if (!found || found.status !== 'active') {
    return null;
  }
  return { ...found, url: buildUrl(found.shareCode, nodes, canvasWidthPx, shadow) };
}

export function createPresentationLink(diagramId: string, documentTitle: string, nodes: FlowNode[], canvasWidthPx: number, shadow?: PresentationShadowSettings): PresentationLinkViewModel {
  const store = readStore();
  const existingCodes = Object.values(store)
    .filter((item) => item.status === 'active')
    .map((item) => item.shareCode);
  const shareCode = generateUniqueShareCode(existingCodes);
  const next: PresentationLinkModel = {
    diagramId,
    shareCode,
    status: 'active',
    documentTitle,
    createdAt: nowIso(),
    regeneratedAt: null
  };
  store[diagramId] = next;
  writeStore(store);
  return { ...next, url: buildUrl(shareCode, nodes, canvasWidthPx, shadow) };
}

export function regeneratePresentationLink(diagramId: string, documentTitle: string, nodes: FlowNode[], canvasWidthPx: number, shadow?: PresentationShadowSettings): PresentationLinkViewModel {
  const store = readStore();
  const existingCodes = Object.values(store)
    .filter((item) => item.diagramId !== diagramId && item.status === 'active')
    .map((item) => item.shareCode);
  const shareCode = generateUniqueShareCode(existingCodes);
  const now = nowIso();
  const next: PresentationLinkModel = {
    diagramId,
    shareCode,
    status: 'active',
    documentTitle,
    createdAt: store[diagramId]?.createdAt ?? now,
    regeneratedAt: now
  };
  store[diagramId] = next;
  writeStore(store);
  return { ...next, url: buildUrl(shareCode, nodes, canvasWidthPx, shadow) };
}

export function resolvePresentationLinkByCode(shareCode: string): PresentationLinkModel | null {
  const store = readStore();
  const found = Object.values(store).find((item) => item.shareCode === shareCode);
  if (!found || found.status !== 'active') {
    return null;
  }
  return found;
}

export async function copyPresentationLink(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
