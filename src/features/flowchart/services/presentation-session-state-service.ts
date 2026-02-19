import type { PresentationSessionStateModel, PresentationSessionStatus } from '@features/flowchart/models/presentation-session-model';
import { nowIso, newId } from '@shared/utils/id-utils';

export function createPresentationSession(shareCode: string, revisionId: string): PresentationSessionStateModel {
  return {
    sessionId: newId(),
    shareCode,
    state: 'connected',
    lastSyncedRevision: revisionId,
    lastSyncedAt: nowIso(),
    lastErrorCode: null
  };
}

export function transitionPresentationSession(
  session: PresentationSessionStateModel,
  nextState: PresentationSessionStatus,
  nextRevision?: string,
  errorCode?: string
): PresentationSessionStateModel {
  return {
    ...session,
    state: nextState,
    lastSyncedRevision: nextRevision ?? session.lastSyncedRevision,
    lastSyncedAt: nowIso(),
    lastErrorCode: errorCode ?? null
  };
}
