import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('editor layout structure integration', () => {
  it('renders top/left/workspace/right regions in edit mode', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    expect(screen.getByTestId('editor-toolbar-section')).toBeInTheDocument();
    expect(screen.getByTestId('editor-left-rail')).toBeInTheDocument();
    expect(screen.getByTestId('editor-workspace')).toBeInTheDocument();
    expect(screen.getByTestId('editor-right-rail')).toBeInTheDocument();
  });
});
