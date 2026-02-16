import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('center connector integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('aligns connector x positions to each node center in presentation', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '입력' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: '출력' } });
    fireEvent.click(screen.getByText('프레젠테이션 시작'));

    const line = screen.getByTestId(/arrow-/);
    const x1 = Number(line.getAttribute('x1'));
    const x2 = Number(line.getAttribute('x2'));
    const [first, second] = useFlowchartStore
      .getState()
      .nodes.sort((a, b) => a.stepOrder - b.stepOrder);

    expect(x1).toBe(first.x + first.width / 2);
    expect(x2).toBe(second.x + second.width / 2);
  });
});
