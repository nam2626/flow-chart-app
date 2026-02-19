import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowLayoutStack } from '@features/flowchart/components/flow-layout-stack';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';

describe('flow-layout-stack', () => {
  it('renders vertical stack and connector row in edit mode', () => {
    const nodes = [createFlowNodeFixture(1, 'rectangle', 'A'), createFlowNodeFixture(2, 'ellipse', 'B')];
    render(React.createElement(FlowLayoutStack, { nodes, mode: 'edit', canvasWidthPx: 320 }));

    expect(screen.getByTestId('connector-row-1')).toBeInTheDocument();
    expect(screen.getByLabelText('step-text-1')).toBeInTheDocument();
  });

  it('renders presentation nodes without absolute positioning', () => {
    const nodes = [createFlowNodeFixture(1, 'rectangle', 'A'), createFlowNodeFixture(2, 'ellipse', 'B')];
    render(React.createElement(FlowLayoutStack, { nodes, mode: 'presentation', canvasWidthPx: 320 }));

    const node = screen.getByTestId('presentation-node-1');
    expect(node).not.toHaveStyle({ position: 'absolute' });
    expect(screen.getByTestId('connector-row-1')).toBeInTheDocument();
  });

  it('keeps flow container as vertical flex with centered cross axis in edit mode', () => {
    const nodes = [createFlowNodeFixture(1, 'rectangle', 'A')];
    render(React.createElement(FlowLayoutStack, { nodes, mode: 'edit', canvasWidthPx: 320 }));

    const container = screen.getByTestId('edit-flow-container');
    expect(container).toHaveStyle({ display: 'flex' });
    expect(container).toHaveStyle({ flexDirection: 'column' });
    expect(container).toHaveStyle({ alignItems: 'center' });
  });
});
