import type { PresentationAccessEventModel, PresentationAccessEventType } from '@features/flowchart/models/presentation-access-event-model';
import { nowIso, newId } from '@shared/utils/id-utils';

const EVENT_STORAGE_KEY = 'flowchart-presentation-events-v1';

function readEvents(): PresentationAccessEventModel[] {
  try {
    const raw = window.localStorage.getItem(EVENT_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as PresentationAccessEventModel[];
  } catch {
    return [];
  }
}

function writeEvents(events: PresentationAccessEventModel[]): void {
  window.localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
}

export function recordPresentationAccessEvent(
  shareCode: string,
  eventType: PresentationAccessEventType,
  reasonCode?: string,
  latencyMs?: number
): void {
  const next: PresentationAccessEventModel = {
    eventId: newId(),
    shareCode,
    eventType,
    occurredAt: nowIso(),
    reasonCode,
    latencyMs
  };
  const events = readEvents();
  events.push(next);
  writeEvents(events.slice(-500));
}

export function getPresentationAccessEvents(): PresentationAccessEventModel[] {
  return readEvents();
}
