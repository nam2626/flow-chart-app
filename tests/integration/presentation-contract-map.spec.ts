import { describe, expect, it } from 'vitest';
import { ContractMap } from '@features/flowchart/services/contract-map';
import { alignmentContractFixture, exportContractFixture } from '../helpers/contract-fixture';

describe('presentation contract map', () => {
  it('keeps export contract messages aligned', () => {
    expect(ContractMap.export.emptyStepText).toBe(exportContractFixture.emptyStepText);
    expect(ContractMap.export.invalidCanvasWidth).toBe(exportContractFixture.invalidCanvasWidth);
  });

  it('keeps connector alignment contract constants aligned', () => {
    expect(ContractMap.presentation.centerConnectorRule).toBe(alignmentContractFixture.rule);
    expect(alignmentContractFixture.xTolerancePx).toBe(0);
  });
});
