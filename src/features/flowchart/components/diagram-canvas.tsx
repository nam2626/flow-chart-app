import React, { useEffect, useMemo } from 'react';
import { DiagramToolbar } from '@features/flowchart/components/diagram-toolbar';
import { FlowLayoutStack } from '@features/flowchart/components/flow-layout-stack';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import { ProgressionBanner } from '@features/flowchart/components/progression-banner';
import { ShortcutSettings } from '@features/flowchart/components/shortcut-settings';
import { StepOrderPanel } from '@features/flowchart/components/step-order-panel';
import { editorVisualRules } from '@features/flowchart/models/editor-visual-rules';
import { EDITOR_SECTION_LABELS } from '@features/flowchart/models/ux-copy';
import { shouldTriggerNextStep } from '@features/flowchart/shortcuts/next-step-shortcut';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function DiagramCanvas(): JSX.Element {
  const { diagram, nodes, addNode, presentation, shortcut, updateNodeLabel, updateNodeColors, removeNode, nextPresentationStep } =
    useFlowchartStore();
  const presentationShadow = useFlowchartStore((s) => s.presentationShadow);
  const showEmbeddedPresentation = presentation.isRunning && !presentation.openedInNewTab;
  const activeNode = nodes.find((node) => node.nodeId === diagram.activeNodeId) ?? null;

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
    <section data-testid="editor-shell" style={{ display: 'grid', gap: '12px' }}>
      <section
        data-testid="editor-toolbar-section"
        aria-label={EDITOR_SECTION_LABELS.toolbar}
        style={{
          border: `1px solid ${editorVisualRules.colors.panelBorder}`,
          borderRadius: '8px',
          padding: '8px',
          background: '#fff'
        }}
      >
        <h1 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600 }}>Professional Flowchart Desktop Editor</h1>
        <DiagramToolbar />
      </section>

      <ProgressionBanner />

      {showEmbeddedPresentation ? (
        <PresentationMode nodes={sortedNodes} canvasWidthPx={diagram.canvasWidthPx} shadowSettings={presentationShadow} />
      ) : (
        <section
          data-testid="editor-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '220px minmax(320px, 1fr) 260px',
            gap: '12px',
            alignItems: 'start'
          }}
        >
          <aside
            data-testid="editor-left-rail"
            aria-label={EDITOR_SECTION_LABELS.layers}
            style={{
              border: `1px solid ${editorVisualRules.colors.panelBorder}`,
              borderRadius: '8px',
              padding: '12px',
              background: editorVisualRules.colors.panelBackground
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '32px' }}>{EDITOR_SECTION_LABELS.shapes}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <button
                aria-label="사각형 추가"
                onClick={() => addNode('rectangle')}
                style={{
                  display: 'grid',
                  gap: '6px',
                  justifyItems: 'center',
                  padding: '10px 6px',
                  border: `1px solid ${editorVisualRules.colors.panelBorder}`,
                  borderRadius: '10px',
                  background: '#fff'
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '44px',
                    height: '30px',
                    background: editorVisualRules.colors.accentFill,
                    border: `2px solid ${editorVisualRules.colors.accentBorder}`
                  }}
                />
                <span aria-hidden>Rectangle</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>사각형 추가</span>
              </button>
              <button
                aria-label="타원 추가"
                onClick={() => addNode('ellipse')}
                style={{
                  display: 'grid',
                  gap: '6px',
                  justifyItems: 'center',
                  padding: '10px 6px',
                  border: `1px solid ${editorVisualRules.colors.panelBorder}`,
                  borderRadius: '10px',
                  background: '#fff'
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '44px',
                    height: '30px',
                    borderRadius: '50%',
                    background: editorVisualRules.colors.accentFill,
                    border: `2px solid ${editorVisualRules.colors.accentBorder}`
                  }}
                />
                <span aria-hidden>Oval</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>타원 추가</span>
              </button>
            </div>
            <StepOrderPanel />
          </aside>

          <main
            data-testid="editor-workspace"
            aria-label={EDITOR_SECTION_LABELS.canvas}
            style={{
              border: `1px solid ${editorVisualRules.colors.panelBorder}`,
              borderRadius: '8px',
              padding: '12px',
              minHeight: '480px',
              backgroundColor: editorVisualRules.colors.workspaceBackground,
              backgroundImage:
                `linear-gradient(${editorVisualRules.colors.workspaceGridLine} 1px, transparent 1px),` +
                `linear-gradient(90deg, ${editorVisualRules.colors.workspaceGridLine} 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }}
          >
            <div
              style={{
                margin: '0 auto',
                maxWidth: `${diagram.canvasWidthPx + 56}px`,
                borderRadius: '10px',
                background: editorVisualRules.colors.canvasSurface,
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.08)',
                border: `1px solid ${editorVisualRules.colors.panelBorder}`,
                padding: '8px'
              }}
            >
              <FlowLayoutStack
                mode="edit"
                nodes={sortedNodes}
                canvasWidthPx={diagram.canvasWidthPx}
                onLabelChange={updateNodeLabel}
                onColorChange={updateNodeColors}
                onDelete={removeNode}
              />
            </div>
          </main>

          <aside
            data-testid="editor-right-rail"
            aria-label={EDITOR_SECTION_LABELS.properties}
            style={{
              border: `1px solid ${editorVisualRules.colors.panelBorder}`,
              borderRadius: '8px',
              padding: '12px',
              background: editorVisualRules.colors.panelBackground
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '32px' }}>{EDITOR_SECTION_LABELS.properties}</h2>
            <ShortcutSettings />
            <section aria-label="selected-node-properties" style={{ marginTop: '12px' }}>
              {activeNode ? (
                <p style={{ margin: 0, fontSize: '12px', color: '#374151' }}>{`선택 단계: ${activeNode.stepOrder} - ${activeNode.label}`}</p>
              ) : (
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>선택된 도형이 없습니다.</p>
              )}
            </section>
          </aside>
        </section>
      )}
    </section>
  );
}
