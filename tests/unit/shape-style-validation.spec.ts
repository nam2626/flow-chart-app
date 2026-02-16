import { describe, expect, it } from 'vitest';
import { isValidHexColor, sanitizeShapeColors } from '@features/flowchart/services/color-validation-service';

describe('shape style validation', () => {
  it('accepts valid hex colors', () => {
    expect(isValidHexColor('#fff')).toBe(true);
    expect(isValidHexColor('#1f2937')).toBe(true);
  });

  it('falls back to default colors on invalid input', () => {
    const result = sanitizeShapeColors({ fillColor: 'invalid', borderColor: '#zzzzzz' });
    expect(result.fillColor).toBe('#f0f7ff');
    expect(result.borderColor).toBe('#0f4c81');
  });
});
