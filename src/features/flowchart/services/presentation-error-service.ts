export type PresentationAccessErrorCode =
  | 'LINK_NOT_FOUND'
  | 'LINK_REVOKED'
  | 'DOCUMENT_DELETED'
  | 'PERMISSION_DENIED'
  | 'SYNC_FAILED';

export interface PresentationAccessErrorViewModel {
  code: PresentationAccessErrorCode;
  title: string;
  message: string;
  actions: Array<'retry' | 'regenerate' | 'open-editor'>;
}

const ERROR_MAP: Record<PresentationAccessErrorCode, PresentationAccessErrorViewModel> = {
  LINK_NOT_FOUND: {
    code: 'LINK_NOT_FOUND',
    title: '링크를 찾을 수 없습니다',
    message: '링크가 잘못되었거나 존재하지 않습니다.',
    actions: ['open-editor']
  },
  LINK_REVOKED: {
    code: 'LINK_REVOKED',
    title: '링크가 무효화되었습니다',
    message: '새 링크를 생성한 뒤 다시 접속해 주세요.',
    actions: ['regenerate', 'open-editor']
  },
  DOCUMENT_DELETED: {
    code: 'DOCUMENT_DELETED',
    title: '원본 문서를 찾을 수 없습니다',
    message: '문서가 삭제되어 발표 화면을 표시할 수 없습니다.',
    actions: ['open-editor']
  },
  PERMISSION_DENIED: {
    code: 'PERMISSION_DENIED',
    title: '접근 권한이 없습니다',
    message: '현재 링크로 발표 화면에 접근할 수 없습니다.',
    actions: ['open-editor']
  },
  SYNC_FAILED: {
    code: 'SYNC_FAILED',
    title: '동기화에 실패했습니다',
    message: '잠시 후 다시 시도해 주세요.',
    actions: ['retry']
  }
};

export function mapPresentationAccessError(code: PresentationAccessErrorCode): PresentationAccessErrorViewModel {
  return ERROR_MAP[code];
}
