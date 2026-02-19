import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import { createFlowNodesFixture } from '../helpers/flowchart-fixture';

describe('presentation mode regression', () => {
  it('keeps centered presentation root and uses flow layout container', () => {
    render(React.createElement(PresentationMode, { nodes: createFlowNodesFixture(2), canvasWidthPx: 320 }));

    const root = screen.getByTestId('presentation-mode-root');
    expect(root).toHaveStyle({ display: 'flex' });
    expect(root).toHaveStyle({ justifyContent: 'center' });
    expect(screen.getByTestId('presentation-flow-container')).toBeInTheDocument();
  });
});
