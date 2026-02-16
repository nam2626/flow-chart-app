import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ContractMap } from '@features/flowchart/services/contract-map';

describe('presentation export contract mapping', () => {
  it('keeps contract constants aligned with openapi document', () => {
    const openapiPath = resolve(process.cwd(), 'specs/001-presentation-png-redesign/contracts/presentation-export.openapi.yaml');
    const content = readFileSync(openapiPath, 'utf8');

    expect(content).toContain('enum: [presentation]');
    expect(content).toContain('enum: [4]');
    expect(ContractMap.export.sourceView).toBe('presentation');
    expect(ContractMap.presentation.arrowEndOffsetPx).toBe(4);
  });
});
