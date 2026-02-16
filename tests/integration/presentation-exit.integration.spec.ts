import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation exit integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('종료 후에도 입력 데이터는 유지되고 편집으로 복귀한다', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '유지 텍스트' } });
    fireEvent.click(screen.getByText('프레젠테이션 시작'));
    fireEvent.click(screen.getByText('프레젠테이션 종료'));

    expect(screen.getByDisplayValue('유지 텍스트')).toBeInTheDocument();
    expect(screen.getByText('프레젠테이션을 종료했습니다.')).toBeInTheDocument();
  });
});
