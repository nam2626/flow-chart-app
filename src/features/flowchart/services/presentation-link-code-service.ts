import { SHARE_CODE_MAX_LENGTH, SHARE_CODE_MIN_LENGTH } from '@features/flowchart/models/presentation-link-model';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateShareCode(length = SHARE_CODE_MIN_LENGTH): string {
  const targetLength = Math.max(SHARE_CODE_MIN_LENGTH, Math.min(SHARE_CODE_MAX_LENGTH, Math.floor(length)));
  let result = '';
  for (let i = 0; i < targetLength; i += 1) {
    const idx = Math.floor(Math.random() * CODE_CHARS.length);
    result += CODE_CHARS[idx];
  }
  return result;
}

export function generateUniqueShareCode(existingCodes: Iterable<string>, length = SHARE_CODE_MIN_LENGTH): string {
  const existing = new Set(existingCodes);
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const code = generateShareCode(length);
    if (!existing.has(code)) {
      return code;
    }
  }
  throw new Error('공유 코드 생성에 실패했습니다.');
}

export function isValidShareCode(value: string): boolean {
  return value.length >= SHARE_CODE_MIN_LENGTH && value.length <= SHARE_CODE_MAX_LENGTH;
}
