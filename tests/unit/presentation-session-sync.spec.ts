import { describe, expect, it } from 'vitest';
import { createPresentationSession, transitionPresentationSession } from '@features/flowchart/services/presentation-session-state-service';

describe('presentation session sync transition', () => {
  it('transitions connected -> revoked', () => {
    const session = createPresentationSession('ABC123', 'r1');
    const next = transitionPresentationSession(session, 'revoked');
    expect(next.state).toBe('revoked');
  });
});
