import React, { useEffect, useMemo } from 'react';
import { DiagramToolbar } from '@features/flowchart/components/diagram-toolbar';
import { FlowLayoutStack } from '@features/flowchart/components/flow-layout-stack';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import { ProgressionBanner } from '@features/flowchart/components/progression-banner';
import { ShortcutSettings } from '@features/flowchart/components/shortcut-settings';
import { StepOrderPanel } from '@features/flowchart/components/step-order-panel';
import { shouldTriggerNextStep } from '@features/flowchart/shortcuts/next-step-shortcut';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function DiagramCanvas(): JSX.Element {
  const { diagram, nodes, addNode, presentation, shortcut, updateNodeLabel, updateNodeColors, removeNode, nextPresentationStep } =
    useFlowchartStore();
  const showEmbeddedPresentation = presentation.isRunning && !presentation.openedInNewTab;

  const sortedNodes = useMemo(() => [...nodes].sort((a, b) => a.stepOrder - b.stepOrder), [nodes]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (!presentation.isRunning) {
        return;
      }
      if (!shouldTriggerNextStep(e.key, shortcut.nextStepKey)) {
        return;
      }
      nextPresentationStep();
    };

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [nextPresentationStep, presentation.isRunning, shortcut.nextStepKey]);

  return (
    <section>
      <DiagramToolbar />

      {!showEmbeddedPresentation ? (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button onClick={() => addNode('rectangle')}>사각형 추가</button>
          <button onClick={() => addNode('ellipse')}>타원 추가</button>
        </div>
      ) : null}

      {showEmbeddedPresentation ? (
        <PresentationMode nodes={sortedNodes} canvasWidthPx={diagram.canvasWidthPx} />
      ) : (
        <FlowLayoutStack
          mode="edit"
          nodes={sortedNodes}
          canvasWidthPx={diagram.canvasWidthPx}
          onLabelChange={updateNodeLabel}
          onColorChange={updateNodeColors}
          onDelete={removeNode}
        />
      )}

      <ProgressionBanner />
      {!showEmbeddedPresentation ? (
        <>
          <ShortcutSettings />
          <StepOrderPanel />
        </>
      ) : null}
    </section>
  );
}
