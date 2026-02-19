import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation link live sync integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
  });

  it('updates store nodes after editor save-style updates', () => {
    render(React.createElement(DiagramCanvas));
    fireEvent.click(screen.getByLabelText('사각형 추가'));
    fireEvent.change(screen.getByLabelText('step-text-1'), { target: { value: '동기화 텍스트' } });
    expect(useFlowchartStore.getState().nodes[0].label).toBe('동기화 텍스트');
  });
});
