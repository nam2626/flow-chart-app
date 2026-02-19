import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@app/app-shell';

describe('presentation invalid link integration', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/p/INVALID1');
  });

  it('shows denied view for invalid link', () => {
    render(React.createElement(AppShell));
    expect(screen.getByTestId('presentation-route-denied')).toBeInTheDocument();
  });
});
