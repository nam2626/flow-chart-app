export interface ShapeStyleModel {
  shapeId: string;
  fillColor: string;
  borderColor: string;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  updatedAt: string;
}

export interface ShapeStyleSnapshot {
  styles: Record<string, ShapeStyleModel>;
}
