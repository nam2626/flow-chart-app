import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('shape style integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('applies per-shape fill and border color changes for all shapes', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('사각형 추가'));

    const fillInput1 = screen.getByLabelText('fill-color-1') as HTMLInputElement;
    const borderInput1 = screen.getByLabelText('border-color-1') as HTMLInputElement;
    const fillInput2 = screen.getByLabelText('fill-color-2') as HTMLInputElement;
    const borderInput2 = screen.getByLabelText('border-color-2') as HTMLInputElement;

    fireEvent.change(fillInput1, { target: { value: '#dbeafe' } });
    fireEvent.change(borderInput1, { target: { value: '#1d4ed8' } });
    fireEvent.change(fillInput2, { target: { value: '#dcfce7' } });
    fireEvent.change(borderInput2, { target: { value: '#166534' } });

    const [first, second] = useFlowchartStore.getState().nodes.sort((a, b) => a.stepOrder - b.stepOrder);
    expect(first.fillColor).toBe('#dbeafe');
    expect(first.borderColor).toBe('#1d4ed8');
    expect(second.fillColor).toBe('#dcfce7');
    expect(second.borderColor).toBe('#166534');
  });
});
