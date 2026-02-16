import { WIDTH_MAX, WIDTH_MIN } from '@features/flowchart/services/flowchart-validation';

export const ContractMap = {
  createDiagram: {
    canvasWidthMin: WIDTH_MIN,
    canvasWidthMax: WIDTH_MAX
  },
  colors: {
    defaultFill: '#f0f7ff',
    defaultBorder: '#0f4c81'
  },
  presentation: {
    hideStepOrderText: true,
    arrowEndOffsetPx: 4,
    themeId: 'presentation-redesign-v1',
    newTabBlockedCode: 'NEW_TAB_BLOCKED',
    centerConnectorRule: 'CENTER_X_WITH_BOUNDARY_Y'
  },
  layout: {
    direction: 'TOP_TO_BOTTOM',
    crossAxisAlign: 'CENTER',
    stackMode: 'AUTO_ONLY',
    positionPolicy: 'FLOW_ONLY',
    heightPolicy: 'EXPAND_WITH_CONTENT',
    centerTolerancePx: 0
  },
  export: {
    sourceView: 'presentation',
    emptyStepText: '모든 단계에 텍스트를 입력해야 합니다.',
    emptyDiagram: '최소 1개의 도형이 필요합니다.',
    invalidSourceView: '프레젠테이션 화면에서만 PNG 내보내기가 가능합니다.',
    invalidCanvasWidth: '캔버스 폭은 300~400 범위여야 합니다.',
    unknown: '내보내기에 실패했습니다. 입력값을 확인하세요.'
  },
  import: {
    maxBytes: 5 * 1024 * 1024,
    defaultResolution: 'imported_precedence'
  }
} as const;
