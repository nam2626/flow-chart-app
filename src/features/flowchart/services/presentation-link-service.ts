import { generateUniqueShareCode } from '@features/flowchart/services/presentation-link-code-service';
import type { PresentationLinkModel } from '@features/flowchart/models/presentation-link-model';
import { nowIso } from '@shared/utils/id-utils';

const STORAGE_KEY = 'flowchart-presentation-links-v1';

type LinkStore = Record<string, PresentationLinkModel>;

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

function buildUrl(code: string): string {
  return `${window.location.origin}/p/${code}`;
}

export interface PresentationLinkViewModel extends PresentationLinkModel {
  url: string;
}

export function getPresentationLink(diagramId: string): PresentationLinkViewModel | null {
  const store = readStore();
  const found = store[diagramId];
  if (!found || found.status !== 'active') {
    return null;
  }
  return { ...found, url: buildUrl(found.shareCode) };
}

export function createPresentationLink(diagramId: string, documentTitle: string): PresentationLinkViewModel {
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
  return { ...next, url: buildUrl(shareCode) };
}

export function regeneratePresentationLink(diagramId: string, documentTitle: string): PresentationLinkViewModel {
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
  return { ...next, url: buildUrl(shareCode) };
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
