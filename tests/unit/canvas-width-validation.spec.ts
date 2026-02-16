import { describe, expect, it } from 'vitest';
import { isValidCanvasWidth } from '@features/flowchart/services/flowchart-validation';

describe('canvas width validation', () => {
  it('경계값 300/400을 허용한다', () => {
    expect(isValidCanvasWidth(300)).toBe(true);
    expect(isValidCanvasWidth(400)).toBe(true);
  });

  it('범위 외 값을 거부한다', () => {
    expect(isValidCanvasWidth(299)).toBe(false);
    expect(isValidCanvasWidth(401)).toBe(false);
    expect(isValidCanvasWidth(Number.NaN)).toBe(false);
  });
});
