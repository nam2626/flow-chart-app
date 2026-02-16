import type { ShapeStyleModel, ShapeStyleSnapshot } from '@features/flowchart/models/shape-style-model';

const STYLE_STORAGE_KEY = 'flowchart-shape-style-storage-v1';

function safeRead(): ShapeStyleSnapshot {
  try {
    const raw = localStorage.getItem(STYLE_STORAGE_KEY);
    if (!raw) {
      return { styles: {} };
    }
    const parsed = JSON.parse(raw) as Partial<ShapeStyleSnapshot>;
    return {
      styles: parsed.styles ?? {}
    };
  } catch {
    return { styles: {} };
  }
}

function safeWrite(snapshot: ShapeStyleSnapshot): void {
  try {
    localStorage.setItem(STYLE_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // 저장소 오류는 편집 흐름을 막지 않는다.
  }
}

export function getShapeStyle(shapeId: string): ShapeStyleModel | null {
  const snapshot = safeRead();
  return snapshot.styles[shapeId] ?? null;
}

export function saveShapeStyle(style: ShapeStyleModel): void {
  const snapshot = safeRead();
  snapshot.styles[style.shapeId] = style;
  safeWrite(snapshot);
}

export function deleteShapeStyle(shapeId: string): void {
  const snapshot = safeRead();
  if (!snapshot.styles[shapeId]) {
    return;
  }
  delete snapshot.styles[shapeId];
  safeWrite(snapshot);
}

export function clearShapeStyles(): void {
  safeWrite({ styles: {} });
}
