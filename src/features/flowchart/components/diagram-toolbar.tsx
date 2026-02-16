import React, { useState } from 'react';
import { CanvasWidthControl } from '@features/flowchart/components/canvas-width-control';
import { ImportConflictDialog } from '@features/flowchart/components/import-conflict-dialog';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';
import { exportDiagramJson, exportDiagramSvg } from '@features/flowchart/services/json-transfer-service';
import { exportPresentationPng } from '@features/flowchart/services/png-export-service';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

export function DiagramToolbar(): JSX.Element {
  const state = useFlowchartStore();
  const setProgressMessage = useFlowchartStore((s) => s.setProgressMessage);
  const [open, setOpen] = useState(false);

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

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <CanvasWidthControl />
      <button onClick={onResetAll}>전체 초기화</button>
      <button onClick={state.startPresentation}>프레젠테이션 시작</button>
      <button onClick={state.prevPresentationStep} disabled={!state.presentation.isRunning}>
        이전 단계
      </button>
      <button onClick={state.nextPresentationStep} disabled={!state.presentation.isRunning}>
        다음 단계
      </button>
      <button onClick={state.stopPresentation} disabled={!state.presentation.isRunning}>
        프레젠테이션 종료
      </button>
      <button onClick={onExportJson}>JSON 내보내기</button>
      <button onClick={onExportSvg}>SVG 내보내기</button>
      <button onClick={onExportPng}>PNG 내보내기</button>
      <button onClick={() => setOpen(true)}>충돌 대응안 확인</button>
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
