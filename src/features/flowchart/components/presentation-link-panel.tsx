import React, { useMemo, useState } from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';
import {
  copyPresentationLink,
  createPresentationLink,
  getPresentationLink,
  regeneratePresentationLink
} from '@features/flowchart/services/presentation-link-service';

export function PresentationLinkPanel(): JSX.Element {
  const diagramId = useFlowchartStore((s) => s.diagram.diagramId);
  const title = useFlowchartStore((s) => s.diagram.title);
  const nodes = useFlowchartStore((s) => s.nodes);
  const canvasWidthPx = useFlowchartStore((s) => s.diagram.canvasWidthPx);
  const setProgressMessage = useFlowchartStore((s) => s.setProgressMessage);
  const setPresentationLinkMetadata = useFlowchartStore((s) => s.setPresentationLinkMetadata);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  const link = useMemo(() => getPresentationLink(diagramId, nodes, canvasWidthPx), [diagramId, nodes, canvasWidthPx, updatedAt]);

  const onCreate = () => {
    const next = createPresentationLink(diagramId, title, nodes, canvasWidthPx);
    setPresentationLinkMetadata(next.shareCode, 'active');
    setUpdatedAt(next.regeneratedAt ?? next.createdAt);
    setProgressMessage('프레젠테이션 링크가 생성되었습니다.');
  };

  const onRegenerate = () => {
    const next = regeneratePresentationLink(diagramId, title, nodes, canvasWidthPx);
    setPresentationLinkMetadata(next.shareCode, 'active');
    setUpdatedAt(next.regeneratedAt ?? next.createdAt);
    setProgressMessage('프레젠테이션 링크를 재생성했습니다.');
  };

  const onCopy = async () => {
    if (!link) {
      return;
    }
    const ok = await copyPresentationLink(link.url);
    setProgressMessage(ok ? '프레젠테이션 링크를 복사했습니다.' : '클립보드 복사에 실패했습니다.');
  };

  return (
    <section style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }} aria-label="presentation-link-panel">
      <button onClick={onCreate}>프레젠테이션 링크 생성</button>
      <button onClick={onCopy} disabled={!link}>
        링크 복사
      </button>
      <button onClick={onRegenerate} disabled={!link}>
        링크 재생성
      </button>
      <span data-testid="presentation-link-url" style={{ fontSize: '12px', color: '#475569' }}>
        {link?.url ?? '링크 없음'}
      </span>
    </section>
  );
}
