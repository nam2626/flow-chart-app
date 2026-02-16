import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';

describe('presentation tab layout integration', () => {
  beforeEach(() => {
    globalThis.setWindowOpenMockResult(window);
  });

  it('renders centered presentation layout', () => {
    const nodes = [createFlowNodeFixture(1, 'rectangle', 'A'), createFlowNodeFixture(2, 'ellipse', 'B')];
    render(React.createElement(PresentationMode, { nodes, canvasWidthPx: 320 }));

    const root = screen.getByTestId('presentation-mode-root');
    expect(root).toHaveStyle({ display: 'flex', justifyContent: 'center' });
    expect(screen.getByTestId('connector-row-1')).toBeInTheDocument();
  });
});
