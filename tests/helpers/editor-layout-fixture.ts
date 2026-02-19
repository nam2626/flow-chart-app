export interface EditorLayoutFixture {
  hasToolbar: boolean;
  hasLeftRail: boolean;
  hasWorkspace: boolean;
  hasRightRail: boolean;
}

export function createEditorLayoutFixture(overrides?: Partial<EditorLayoutFixture>): EditorLayoutFixture {
  return {
    hasToolbar: true,
    hasLeftRail: true,
    hasWorkspace: true,
    hasRightRail: true,
    ...overrides
  };
}
