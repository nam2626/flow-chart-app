import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('diagram-canvas layout', () => {
  it('renders four edit regions with toolbar/left/workspace/right', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    expect(screen.getByTestId('editor-toolbar-section')).toBeInTheDocument();
    expect(screen.getByTestId('editor-left-rail')).toBeInTheDocument();
    expect(screen.getByTestId('editor-workspace')).toBeInTheDocument();
    expect(screen.getByTestId('editor-right-rail')).toBeInTheDocument();
  });
});
