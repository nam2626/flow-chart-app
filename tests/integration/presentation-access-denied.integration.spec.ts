import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@app/app-shell';

describe('presentation access denied integration', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/p/AAAAAA');
  });

  it('renders denied-state for missing source document', () => {
    render(React.createElement(AppShell));
    expect(screen.getByText(/링크를 찾을 수 없습니다|링크가 무효화되었습니다/)).toBeInTheDocument();
  });
});
