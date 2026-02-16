import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('canvas width control integration', () => {
  it('300~400 범위 입력만 반영한다', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    const input = screen.getByLabelText('canvas-width-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '350' } });
    expect(useFlowchartStore.getState().diagram.canvasWidthPx).toBe(350);

    fireEvent.change(input, { target: { value: '401' } });
    expect(useFlowchartStore.getState().diagram.canvasWidthPx).toBe(350);
  });
});
