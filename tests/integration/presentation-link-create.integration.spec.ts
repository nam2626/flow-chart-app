import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@app/app-shell';
import { createPresentationLink } from '@features/flowchart/services/presentation-link-service';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

describe('presentation link create integration', () => {
  beforeEach(() => {
    useFlowchartStore.setState(useFlowchartStore.getInitialState());
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('renders presentation route when share code path is opened', () => {
    const state = useFlowchartStore.getState();
    state.addNode('rectangle');
    const link = createPresentationLink(state.diagram.diagramId, state.diagram.title, [], state.diagram.canvasWidthPx);
    window.history.replaceState({}, '', `/p/${link.shareCode}`);

    render(React.createElement(AppShell));
    expect(screen.getByTestId('presentation-route')).toBeInTheDocument();
  });
});
