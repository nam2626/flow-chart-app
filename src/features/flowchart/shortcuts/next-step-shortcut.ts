const RESERVED = new Set(['F5', 'CTRL+R']);

export function normalizeShortcutKey(key: string): string {
  return key.trim().toUpperCase();
}

export function isReservedShortcut(key: string): boolean {
  return RESERVED.has(normalizeShortcutKey(key));
}

export function shouldTriggerNextStep(eventKey: string, preferredKey: string): boolean {
  return normalizeShortcutKey(eventKey) === normalizeShortcutKey(preferredKey);
}
