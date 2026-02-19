export type PresentationSessionStatus = 'connected' | 'revoked' | 'error';

export interface PresentationSessionStateModel {
  sessionId: string;
  shareCode: string;
  state: PresentationSessionStatus;
  lastSyncedRevision: string;
  lastSyncedAt: string;
  lastErrorCode: string | null;
}
