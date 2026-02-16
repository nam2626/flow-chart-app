import { describe, expect, it } from 'vitest';
import { resolveImportConflict } from '@features/flowchart/services/json-transfer-service';

describe('import merge conflict', () => {
  it('기본 충돌 해결은 가져온 파일 우선이다', () => {
    const result = resolveImportConflict({ a: 1 }, { a: 2 }, 'imported_precedence');
    expect(result.a).toBe(2);
  });
});
