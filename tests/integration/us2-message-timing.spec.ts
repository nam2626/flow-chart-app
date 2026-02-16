import { describe, expect, it } from 'vitest';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';

describe('US2 message timing', () => {
  it('진행 메시지 상수를 제공한다', () => {
    expect(FLOW_MESSAGES.movedNext.length).toBeGreaterThan(0);
  });
});
