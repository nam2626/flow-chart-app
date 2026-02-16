import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('shape delete and reset integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('삭제 후 순서를 재정렬하고 전체 초기화를 적용한다', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('타원 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: 'A' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: 'B' } });

    const deleteButtons = screen.getAllByText('단계 삭제');
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByLabelText('step-text-2')).not.toBeInTheDocument();
    expect(screen.getByLabelText('step-text-1')).toBeInTheDocument();

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    fireEvent.click(screen.getByText('전체 초기화'));
    expect(useFlowchartStore.getState().nodes).toHaveLength(0);
    confirmSpy.mockRestore();
  });

  it('순서 입력 변경 시 즉시 재배치한다', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('사각형 추가'));

    const orderInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(orderInputs[0], { target: { value: '2' } });

    const nodes = [...useFlowchartStore.getState().nodes].sort((a, b) => a.stepOrder - b.stepOrder);
    expect(nodes[0].stepOrder).toBe(1);
    expect(nodes[1].stepOrder).toBe(2);
  });
});
