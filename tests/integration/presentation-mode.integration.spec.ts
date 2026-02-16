import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation mode integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('supports start and step navigation with visible connector rows', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.click(screen.getByText('타원 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '시작' } });
    fireEvent.change(screen.getByLabelText('step-text-2'), { target: { value: '종료' } });

    fireEvent.click(screen.getByText('프레젠테이션 시작'));
    expect(screen.getByText(/프레젠테이션을 시작했습니다/)).toBeInTheDocument();
    expect(screen.getByTestId('connector-row-1')).toBeInTheDocument();
    expect(screen.getByText(/\(1\/2\)/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('다음 단계'));
    expect(screen.getByText(/\(2\/2\)/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('이전 단계'));
    expect(screen.getByText(/\(1\/2\)/)).toBeInTheDocument();
  });
});
