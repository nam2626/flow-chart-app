const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export interface ShapeColorValue {
  fillColor: string;
  borderColor: string;
}

export const DEFAULT_SHAPE_COLORS: ShapeColorValue = {
  fillColor: '#f0f7ff',
  borderColor: '#0f4c81'
};

export function isValidHexColor(input: string): boolean {
  return HEX_COLOR_PATTERN.test(input.trim());
}

export function sanitizeShapeColors(input: Partial<ShapeColorValue>): ShapeColorValue {
  const fill = input.fillColor?.trim() ?? '';
  const border = input.borderColor?.trim() ?? '';

  return {
    fillColor: isValidHexColor(fill) ? fill : DEFAULT_SHAPE_COLORS.fillColor,
    borderColor: isValidHexColor(border) ? border : DEFAULT_SHAPE_COLORS.borderColor
  };
}
