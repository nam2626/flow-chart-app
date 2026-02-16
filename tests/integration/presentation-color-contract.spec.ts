import { describe, expect, it } from 'vitest';
import { ContractMap } from '@features/flowchart/services/contract-map';
import { DEFAULT_SHAPE_COLORS } from '@features/flowchart/services/color-validation-service';

describe('presentation color contract', () => {
  it('keeps color defaults and new-tab contract constants aligned', () => {
    expect(ContractMap.colors.defaultFill).toBe(DEFAULT_SHAPE_COLORS.fillColor);
    expect(ContractMap.colors.defaultBorder).toBe(DEFAULT_SHAPE_COLORS.borderColor);
    expect(ContractMap.presentation.newTabBlockedCode).toBe('NEW_TAB_BLOCKED');
    expect(ContractMap.presentation.centerConnectorRule).toBe('CENTER_X_WITH_BOUNDARY_Y');
  });
});
