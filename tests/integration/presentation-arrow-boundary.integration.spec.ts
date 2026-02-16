import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation boundary connector integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('renders connector rows in presentation mode without absolute positioned arrows', () => {
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '입력' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: '출력' } });
    fireEvent.click(screen.getByText('프레젠테이션 시작'));

    const connectorRow = screen.getByTestId('connector-row-1');
    expect(connectorRow).toBeInTheDocument();
    expect(connectorRow).not.toHaveStyle({ position: 'absolute' });
  });
});
