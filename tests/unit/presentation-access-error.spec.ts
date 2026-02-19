import { describe, expect, it } from 'vitest';
import { mapPresentationAccessError } from '@features/flowchart/services/presentation-error-service';

describe('presentation access error', () => {
  it('maps revoked code to recovery actions', () => {
    const vm = mapPresentationAccessError('LINK_REVOKED');
    expect(vm.actions).toContain('regenerate');
  });
});
