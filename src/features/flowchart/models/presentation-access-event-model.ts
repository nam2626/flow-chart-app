export type PresentationAccessEventType =
  | 'open_success'
  | 'open_denied'
  | 'session_revoked'
  | 'sync_update'
  | 'sync_error';

export interface PresentationAccessEventModel {
  eventId: string;
  shareCode: string;
  eventType: PresentationAccessEventType;
  occurredAt: string;
  latencyMs?: number;
  reasonCode?: string;
}
