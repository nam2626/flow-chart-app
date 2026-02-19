import React, { useEffect, useRef, useState } from 'react';
import { CanvasWidthControl } from '@features/flowchart/components/canvas-width-control';
import { ImportConflictDialog } from '@features/flowchart/components/import-conflict-dialog';
import { PresentationLinkPanel } from '@features/flowchart/components/presentation-link-panel';
import { editorVisualRules } from '@features/flowchart/models/editor-visual-rules';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';
import { exportDiagramJson, exportDiagramSvg } from '@features/flowchart/services/json-transfer-service';
import { exportPresentationPng } from '@features/flowchart/services/png-export-service';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function DiagramToolbar(): JSX.Element {
  const state = useFlowchartStore();
  const setProgressMessage = useFlowchartStore((s) => s.setProgressMessage);
  const [open, setOpen] = useState(false);
  const [fileMenuOpen, setFileMenuOpen] = useState(true);
  const [canvasSettingsOpen, setCanvasSettingsOpen] = useState(true);
  const fileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fileMenuOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!fileMenuRef.current) {
        return;
      }
      if (!fileMenuRef.current.contains(event.target as Node)) {
        setFileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [fileMenuOpen]);

  const onExportJson = () => {
    exportDiagramJson(state, state.diagram.title);
    setProgressMessage('JSON 내보내기가 완료되었습니다.');
  };

  const onExportSvg = () => {
    const result = exportDiagramSvg({
      nodes: state.nodes,
      width: state.diagram.canvasWidthPx,
      title: state.diagram.title
    });
    setProgressMessage(result.message);
  };

  const onExportPng = async () => {
    const result = await exportPresentationPng({
      nodes: state.nodes,
      width: state.diagram.canvasWidthPx,
      title: state.diagram.title,
      sourceView: state.presentation.isRunning ? 'presentation' : 'editor'
    });
    setProgressMessage(result.ok ? FLOW_MESSAGES.pngExportSuccess : result.message);
  };

  const onResetAll = () => {
    const confirmed = window.confirm('모든 도형/연결/프레젠테이션 상태를 초기화하시겠습니까?');
    if (!confirmed) {
      return;
    }
    state.resetAll();
  };

  const toolbarButtonStyle: React.CSSProperties = {
    border: '1px solid #cbd5e1',
    background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
    borderRadius: '8px',
    padding: '7px 12px',
    fontSize: '13px',
    color: '#0f172a',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
    cursor: 'pointer'
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...toolbarButtonStyle,
    opacity: 0.55,
    cursor: 'not-allowed'
  };

  return (
    <div
      data-testid="editor-toolbar"
      style={{
        display: 'grid',
        gap: `${editorVisualRules.spacing.blockGapPx}px`,
        marginBottom: '4px'
      }}
    >
      <div
        data-testid="toolbar-session-controls"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}
      >
        <div ref={fileMenuRef} style={{ position: 'relative' }}>
          <button
            aria-label="file-menu"
            onClick={() => setFileMenuOpen((prev) => !prev)}
            style={{ ...toolbarButtonStyle, fontWeight: 600, minWidth: '72px' }}
          >
            File v
          </button>
          {fileMenuOpen ? (
            <div
              style={{
                position: 'absolute',
                top: '38px',
                left: 0,
                zIndex: 20,
                display: 'grid',
                gap: '6px',
                minWidth: '168px',
                padding: '8px',
                border: '1px solid #d5dbe6',
                borderRadius: '10px',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
              }}
            >
              <button onClick={onExportJson} style={toolbarButtonStyle}>
                JSON 내보내기
              </button>
              <button onClick={onExportSvg} style={toolbarButtonStyle}>
                SVG 내보내기
              </button>
              <button onClick={onExportPng} style={toolbarButtonStyle}>
                PNG 내보내기
              </button>
              <button onClick={() => setOpen(true)} style={toolbarButtonStyle}>
                충돌 대응안 확인
              </button>
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 8px',
            border: '1px solid #d5dbe6',
            borderRadius: '8px',
            background: '#f8fafc'
          }}
        >
          <button onClick={onResetAll} style={toolbarButtonStyle}>
            전체 초기화
          </button>
          <button onClick={state.startPresentation} style={toolbarButtonStyle}>
            프레젠테이션 시작
          </button>
          <button
            onClick={state.prevPresentationStep}
            disabled={!state.presentation.isRunning}
            style={!state.presentation.isRunning ? disabledButtonStyle : toolbarButtonStyle}
          >
            이전 단계
          </button>
          <button
            onClick={state.nextPresentationStep}
            disabled={!state.presentation.isRunning}
            style={!state.presentation.isRunning ? disabledButtonStyle : toolbarButtonStyle}
          >
            다음 단계
          </button>
          <button
            onClick={state.stopPresentation}
            disabled={!state.presentation.isRunning}
            style={!state.presentation.isRunning ? disabledButtonStyle : toolbarButtonStyle}
          >
            프레젠테이션 종료
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setCanvasSettingsOpen((prev) => !prev)}
            style={{ ...toolbarButtonStyle, minWidth: '138px', fontWeight: 600 }}
          >
            Canvas Settings
          </button>
          {canvasSettingsOpen ? (
            <div
              style={{
                position: 'absolute',
                top: '38px',
                right: 0,
                zIndex: 15,
                width: '420px',
                padding: '12px',
                border: '1px solid #d5dbe6',
                borderRadius: '10px',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
              }}
            >
              <CanvasWidthControl />
            </div>
          ) : null}
        </div>
      </div>
      <div
        data-testid="toolbar-export-controls"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <span style={{ fontSize: '12px', color: '#64748b' }}>File menu actions are grouped above.</span>
      </div>
      <PresentationLinkPanel />
      <ImportConflictDialog open={open} onClose={() => setOpen(false)} />
      {state.presentation.isRunning ? (
        <span style={{ fontSize: '12px', color: '#374151' }}>{`단축키 ${state.shortcut.nextStepKey}로 다음 단계 이동`}</span>
      ) : null}
      {state.nodes.length === 0 ? (
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{FLOW_MESSAGES.nothingToDelete}</span>
      ) : null}
    </div>
  );
}





