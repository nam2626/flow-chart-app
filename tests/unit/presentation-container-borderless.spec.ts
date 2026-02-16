import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowLayoutStack } from '@features/flowchart/components/flow-layout-stack';
import { isPresentationContainerBorderless } from '@features/flowchart/services/flowchart-validation';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';

describe('presentation container borderless policy', () => {
  it('renders presentation container without border', () => {
    const nodes = [createFlowNodeFixture(1, 'rectangle', 'A')];
    render(React.createElement(FlowLayoutStack, { nodes, mode: 'presentation', canvasWidthPx: 320 }));

    const container = screen.getByTestId('presentation-flow-container');
    expect(container.style.borderStyle).toBe('none');
    expect(isPresentationContainerBorderless(container.style.borderStyle)).toBe(true);
  });

  it('keeps edit mode border for authoring context', () => {
    const nodes = [createFlowNodeFixture(1, 'rectangle', 'A')];
    render(React.createElement(FlowLayoutStack, { nodes, mode: 'edit', canvasWidthPx: 320 }));

    const container = screen.getByTestId('edit-flow-container');
    expect(container.style.borderStyle).toBe('dashed');
    expect(isPresentationContainerBorderless(container.style.borderStyle)).toBe(false);
  });
});
