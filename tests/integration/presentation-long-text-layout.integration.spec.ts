import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import { buildLongTextNode } from '../helpers/long-text-fixture';
import { createFlowNodeFixture } from '../helpers/flowchart-fixture';

describe('presentation long text layout integration', () => {
  it('keeps long text visible in centered presentation mode', () => {
    const nodes = [buildLongTextNode(), createFlowNodeFixture(2, 'ellipse', '다음 단계')];
    render(React.createElement(PresentationMode, { nodes, canvasWidthPx: 320 }));

    expect(screen.getByText(/매우 긴 설명 텍스트/)).toBeInTheDocument();
    expect(screen.getByTestId('presentation-mode-root')).toHaveStyle({ justifyContent: 'center' });
  });
});
