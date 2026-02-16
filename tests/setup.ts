import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

type WindowOpenMock = ReturnType<typeof vi.fn>;

declare global {
  // 테스트에서 새탭 성공/실패 분기를 쉽게 제어하기 위한 헬퍼
  var setWindowOpenMockResult: (value: Window | null) => void;
  var restoreWindowOpenMock: () => void;
}

const originalWindowOpen = window.open.bind(window);
const windowOpenMock: WindowOpenMock = vi.fn(() => null);

globalThis.setWindowOpenMockResult = (value: Window | null) => {
  windowOpenMock.mockImplementation(() => value);
  Object.defineProperty(window, 'open', {
    configurable: true,
    writable: true,
    value: windowOpenMock
  });
};

globalThis.restoreWindowOpenMock = () => {
  Object.defineProperty(window, 'open', {
    configurable: true,
    writable: true,
    value: originalWindowOpen
  });
};

beforeEach(() => {
  localStorage.clear();
  windowOpenMock.mockReset();
  globalThis.setWindowOpenMockResult(window);
});

afterEach(() => {
  cleanup();
  globalThis.restoreWindowOpenMock();
  vi.restoreAllMocks();
});
