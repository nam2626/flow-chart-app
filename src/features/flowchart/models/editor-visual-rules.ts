export const editorVisualRules = {
  spacing: {
    sectionGapPx: 12,
    blockGapPx: 8,
    panelPaddingPx: 12
  },
  hierarchy: {
    sectionHeadingSizePx: 20,
    panelHeadingSizePx: 18,
    captionSizePx: 12
  },
  alignment: {
    toolbarJustify: 'flex-start',
    railAlign: 'stretch',
    workspaceAlign: 'center'
  },
  colors: {
    panelBorder: '#d5dbe6',
    panelBackground: '#f7f9fc',
    workspaceGridLine: '#e6e9ef',
    workspaceBackground: '#f3f5f9',
    canvasSurface: '#ffffff',
    accentFill: '#dce9f8',
    accentBorder: '#7f93aa'
  }
} as const;
