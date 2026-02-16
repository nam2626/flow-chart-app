import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('center connector integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('renders connector rows between each node in edit view', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('사각형 추가'));

    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '입력' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: '출력' } });

    expect(screen.getByTestId('connector-row-1')).toBeInTheDocument();
    const [first, second] = useFlowchartStore
      .getState()
      .nodes.sort((a, b) => a.stepOrder - b.stepOrder);

    expect(first.x + first.width / 2).toBe(second.x + second.width / 2);
  });
});
