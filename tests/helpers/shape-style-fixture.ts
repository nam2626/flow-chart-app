export interface ShapeStyleFixture {
  fillColor: string;
  borderColor: string;
}

export function buildShapeStyleFixture(fillColor = '#f0f7ff', borderColor = '#0f4c81'): ShapeStyleFixture {
  return {
    fillColor,
    borderColor
  };
}

export function buildShapeStyleSet(): ShapeStyleFixture[] {
  return [
    buildShapeStyleFixture('#fef3c7', '#b45309'),
    buildShapeStyleFixture('#dcfce7', '#166534'),
    buildShapeStyleFixture('#dbeafe', '#1d4ed8')
  ];
}
