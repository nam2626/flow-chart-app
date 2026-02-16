import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('flowchart authoring integration', () => {
  it('단계를 추가하고 텍스트를 입력하면 연결선 행이 렌더링된다', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('타원 추가'));

    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '시작' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: '종료' } });

    expect(screen.getByTestId('connector-row-1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('시작')).toBeInTheDocument();
    expect(screen.getByDisplayValue('종료')).toBeInTheDocument();
  });

  it('순서 변경 후에도 세로 레이아웃의 비겹침을 유지한다', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('사각형 추가'));

    const orderInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(orderInputs[0], { target: { value: '3' } });

    const nodes = useFlowchartStore.getState().nodes.sort((a, b) => a.stepOrder - b.stepOrder);
    expect(nodes[0].y + nodes[0].height).toBeLessThan(nodes[1].y);
    expect(nodes[1].y + nodes[1].height).toBeLessThan(nodes[2].y);
  });

  it('텍스트 미입력 상태에서는 내보내기 오류 메시지를 표시한다', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('SVG 내보내기'));

    expect(screen.getByText('모든 단계에 텍스트를 입력해야 합니다.')).toBeInTheDocument();
  });
});
