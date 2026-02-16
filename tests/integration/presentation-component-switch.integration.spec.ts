import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation component switch integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('switches to presentation component and hides step number text', () => {
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('타원 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '단계 본문 1' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: '단계 본문 2' } });

    fireEvent.click(screen.getByText('프레젠테이션 시작'));

    expect(screen.getByTestId('presentation-mode-root')).toBeInTheDocument();
    expect(screen.queryByLabelText('step-text-1')).not.toBeInTheDocument();
    expect(screen.queryByText('단계 1')).not.toBeInTheDocument();
  });
});
