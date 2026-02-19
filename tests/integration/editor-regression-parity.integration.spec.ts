import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('editor regression parity integration', () => {
  it('keeps authoring to presentation to export controls available', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByRole('button', { name: '사각형 추가' }));
    fireEvent.click(screen.getByRole('button', { name: '사각형 추가' }));
    expect(useFlowchartStore.getState().nodes.length).toBe(2);

    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: 'Step 1' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: 'Step 2' } });
    fireEvent.click(screen.getByRole('button', { name: '프레젠테이션 시작' }));
    expect(useFlowchartStore.getState().presentation.isRunning).toBe(true);

    expect(screen.getByRole('button', { name: 'JSON 내보내기' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SVG 내보내기' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'PNG 내보내기' })).toBeInTheDocument();
  });
});
