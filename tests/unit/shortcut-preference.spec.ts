import { describe, expect, it } from 'vitest';
import { normalizeShortcutKey, isReservedShortcut } from '@features/flowchart/shortcuts/next-step-shortcut';

describe('shortcut preference', () => {
  it('단축키를 대문자로 정규화한다', () => {
    expect(normalizeShortcutKey('n')).toBe('N');
  });

  it('브라우저 예약 조합을 감지한다', () => {
    expect(isReservedShortcut('F5')).toBe(true);
  });
});
