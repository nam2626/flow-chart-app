import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('editor controls accessibility integration', () => {
  it('keeps canvas width input and export controls accessible in redesigned edit shell', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    const widthInput = screen.getByLabelText('canvas-width-input') as HTMLInputElement;
    fireEvent.change(widthInput, { target: { value: '340' } });
    expect(useFlowchartStore.getState().diagram.canvasWidthPx).toBe(340);

    expect(screen.getByRole('button', { name: 'JSON 내보내기' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SVG 내보내기' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'PNG 내보내기' })).toBeInTheDocument();
  });
});
