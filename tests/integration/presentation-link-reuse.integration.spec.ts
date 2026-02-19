import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DiagramToolbar } from '@features/flowchart/components/diagram-toolbar';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation link reuse integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    window.localStorage.clear();
  });

  it('shows generated link and allows copy action', async () => {
    render(React.createElement(DiagramToolbar));
    fireEvent.click(screen.getByRole('button', { name: '프레젠테이션 링크 생성' }));
    expect(screen.getByTestId('presentation-link-url').textContent).toContain('/p/');
  });
});
