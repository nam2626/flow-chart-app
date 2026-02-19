import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('editor visual consistency integration', () => {
  it('renders expected section headings and grouped toolbar controls', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    expect(screen.getByText('Shapes')).toBeInTheDocument();
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-session-controls')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar-export-controls')).toBeInTheDocument();
  });
});
