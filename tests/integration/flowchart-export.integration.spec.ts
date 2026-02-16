import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('flowchart export integration', () => {
  it('유효한 단계 입력 후 SVG 내보내기 성공 메시지를 표시한다', () => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '완료 단계' } });
    fireEvent.click(screen.getByText('SVG 내보내기'));

    expect(screen.getByText('SVG 내보내기가 완료되었습니다.')).toBeInTheDocument();
  });
});
