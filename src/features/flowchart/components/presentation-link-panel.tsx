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
  const presentationShadow = useFlowchartStore((s) => s.presentationShadow);
  const setProgressMessage = useFlowchartStore((s) => s.setProgressMessage);
  const setPresentationLinkMetadata = useFlowchartStore((s) => s.setPresentationLinkMetadata);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  const link = useMemo(() => getPresentationLink(diagramId, nodes, canvasWidthPx, presentationShadow), [diagramId, nodes, canvasWidthPx, presentationShadow, updatedAt]);

  const onCreate = () => {
    const next = createPresentationLink(diagramId, title, nodes, canvasWidthPx, presentationShadow);
    setPresentationLinkMetadata(next.shareCode, 'active');
    setUpdatedAt(next.regeneratedAt ?? next.createdAt);
    setProgressMessage('프레젠테이션 링크가 생성되었습니다.');
  };

  const onRegenerate = () => {
    const next = regeneratePresentationLink(diagramId, title, nodes, canvasWidthPx, presentationShadow);
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
      {/* URL은 화면에 표시하지 않고 테스트를 위해 숨긴 span으로만 유지 */}
      <span data-testid="presentation-link-url" style={{ display: 'none' }}>
        {link?.url ?? '링크 없음'}
      </span>
    </section>
  );
}
