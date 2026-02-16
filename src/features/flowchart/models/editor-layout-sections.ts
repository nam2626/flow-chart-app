export type EditorSectionId = 'toolbar' | 'shapePanel' | 'stepPanel' | 'canvas' | 'propertiesPanel';

export interface EditorLayoutSection {
  sectionId: EditorSectionId;
  order: number;
  role: 'action' | 'navigation' | 'workspace' | 'inspector';
  title: string;
}

export const EDITOR_LAYOUT_SECTIONS: EditorLayoutSection[] = [
  { sectionId: 'toolbar', order: 1, role: 'action', title: 'Toolbar' },
  { sectionId: 'shapePanel', order: 2, role: 'navigation', title: 'Shapes' },
  { sectionId: 'stepPanel', order: 3, role: 'navigation', title: 'Layers/Steps' },
  { sectionId: 'canvas', order: 4, role: 'workspace', title: 'Canvas' },
  { sectionId: 'propertiesPanel', order: 5, role: 'inspector', title: 'Properties' }
];
