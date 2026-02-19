export type PresentationLinkStatus = 'active' | 'revoked';

export interface PresentationLinkModel {
  diagramId: string;
  shareCode: string;
  status: PresentationLinkStatus;
  documentTitle: string;
  createdAt: string;
  regeneratedAt: string | null;
}

export const SHARE_CODE_MIN_LENGTH = 6;
export const SHARE_CODE_MAX_LENGTH = 8;
