import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation borderless mode integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('applies borderless container on presentation start', () => {
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('타원 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '시작' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: '종료' } });
    fireEvent.click(screen.getByText('프레젠테이션 시작'));

    const container = screen.getByTestId('presentation-flow-container');
    expect(container.style.borderStyle).toBe('none');
  });

  it('keeps borderless policy after 10 mode toggles', () => {
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '단일 단계' } });

    for (let i = 0; i < 10; i += 1) {
      fireEvent.click(screen.getByText('프레젠테이션 시작'));
      const container = screen.getByTestId('presentation-flow-container');
      expect(container.style.borderStyle).toBe('none');
      fireEvent.click(screen.getByText('프레젠테이션 종료'));
    }
  });
});
