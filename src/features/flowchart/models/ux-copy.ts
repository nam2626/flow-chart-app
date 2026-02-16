export const FLOW_MESSAGES = {
  idle: '진행 대기 중',
  noOrder: '진행 순서를 먼저 지정하세요.',
  movedNext: '다음 단계로 이동했습니다.',
  movedPrev: '이전 단계로 이동했습니다.',
  firstStep: '첫 단계입니다.',
  lastStep: '마지막 단계입니다.',
  presentationStarted: '프레젠테이션을 시작했습니다.',
  presentationStopped: '프레젠테이션을 종료했습니다.',
  presentationUnavailable: '모든 단계에 텍스트를 입력해야 프레젠테이션을 시작할 수 있습니다.',
  presentationTabBlocked: '브라우저에서 새 탭 열기가 차단되어 프레젠테이션 시작이 취소되었습니다.',
  colorValidationFailed: '유효한 HEX 색상값을 입력해주세요.',
  resetDone: '도형과 연결 상태를 초기화했습니다.',
  nothingToDelete: '삭제할 도형이 없습니다.',
  invalidFileType: '지원하지 않는 파일 형식입니다.',
  overSize: '파일 크기 제한(5MB)을 초과했습니다.',
  emptyStepText: '모든 단계에 텍스트를 입력해야 합니다.',
  invalidCanvasWidth: '캔버스 폭은 300~400 범위여야 합니다.',
  exportSuccess: 'SVG 내보내기가 완료되었습니다.',
  exportFailed: '내보내기에 실패했습니다. 입력값을 확인하세요.',
  pngExportSuccess: 'PNG 내보내기가 완료되었습니다.',
  pngExportFailed: 'PNG 내보내기에 실패했습니다. 입력값을 확인하세요.'
} as const;

export const TERM_GLOSSARY = {
  step: '단계',
  progress: '진행',
  conflict: '충돌',
  limit: '제한',
  presentation: '프레젠테이션',
  centerConnector: '수평 중앙 정렬 화살표'
} as const;
