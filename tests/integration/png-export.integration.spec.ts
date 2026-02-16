import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';
import * as pngService from '@features/flowchart/services/png-export-service';

describe('png export integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('shows success message when png export succeeds', async () => {
    vi.spyOn(pngService, 'exportPresentationPng').mockResolvedValue({
      ok: true,
      message: 'PNG 내보내기가 완료되었습니다.',
      fileName: 'flow.png'
    });

    render(React.createElement(DiagramCanvas));

    fireEvent.click(screen.getByText('사각형 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '내용' } });
    fireEvent.click(screen.getByText('프레젠테이션 시작'));
    fireEvent.click(screen.getByText('PNG 내보내기'));

    expect(await screen.findByText(/PNG 내보내기가 완료되었습니다\./)).toBeInTheDocument();
  });

  it('shows failure reason when png export fails', async () => {
    vi.spyOn(pngService, 'exportPresentationPng').mockResolvedValue({
      ok: false,
      message: '프레젠테이션 화면에서만 PNG 내보내기가 가능합니다.',
      reasonCode: 'INVALID_SOURCE_VIEW'
    });

    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByText('PNG 내보내기'));

    expect(await screen.findByText('프레젠테이션 화면에서만 PNG 내보내기가 가능합니다.')).toBeInTheDocument();
  });
});
