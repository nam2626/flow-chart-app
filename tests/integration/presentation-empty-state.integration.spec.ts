import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';

describe('presentation empty state integration', () => {
  it('renders empty presentation container without border', () => {
    render(React.createElement(PresentationMode, { nodes: [], canvasWidthPx: 320 }));

    const container = screen.getByTestId('presentation-flow-container');
    expect(container.style.borderStyle).toBe('none');
    expect(container).toHaveStyle({ minHeight: '320px' });
  });
});
