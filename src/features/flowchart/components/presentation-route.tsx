import React, { useEffect, useMemo, useState } from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import { PresentationAccessDenied } from '@features/flowchart/components/presentation-access-denied';
import { resolvePresentationLinkByCode, decodeSnapshotFromHash } from '@features/flowchart/services/presentation-link-service';
import {
  mapPresentationAccessError,
  type PresentationAccessErrorCode
} from '@features/flowchart/services/presentation-error-service';
import { recordPresentationAccessEvent } from '@features/flowchart/services/presentation-access-event-service';
import { readPresentationSyncSnapshot, subscribePresentationSync } from '@features/flowchart/services/presentation-session-sync-service';
import type { FlowNode } from '@features/flowchart/models/flowchart-types';

interface PresentationRouteProps {
  shareCode: string;
}

export function PresentationRoute({ shareCode }: PresentationRouteProps): JSX.Element {
  const store = useFlowchartStore();
  const [deniedCode, setDeniedCode] = useState<PresentationAccessErrorCode | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const [syncNodes, setSyncNodes] = useState<FlowNode[] | null>(null);

  // URL 해시(#d=...)에 인코딩된 스냅샷 — OBS/외부 브라우저 컨텍스트에서 localStorage 없이도 렌더링 가능
  const hashSnapshot = useMemo(() => decodeSnapshotFromHash(window.location.hash), []);

  const link = useMemo(() => resolvePresentationLinkByCode(shareCode), [shareCode, store.presentationLink, refreshTick]);

  useEffect(() => {
    // 해시 스냅샷이 있으면 localStorage 없이도 유효한 링크로 간주
    if (!hashSnapshot && !link) {
      setDeniedCode('LINK_NOT_FOUND');
      return;
    }

    if (link) {
      document.title = link.documentTitle;
    }
    const unsubscribe = subscribePresentationSync((payload) => {
      recordPresentationAccessEvent(shareCode, 'sync_update');
      setSyncNodes(payload.nodes);
      setRefreshTick((prev) => prev + 1);
    });

    const poll = window.setInterval(() => {
      const active = resolvePresentationLinkByCode(shareCode);
      // 해시 스냅샷이 있는 경우(OBS 등)는 localStorage 기반 폐기 검사를 건너뜀
      if (!active && !hashSnapshot) {
        setDeniedCode('LINK_REVOKED');
        recordPresentationAccessEvent(shareCode, 'session_revoked', 'LINK_REVOKED');
        window.clearInterval(poll);
      }
      readPresentationSyncSnapshot();
    }, 700);

    recordPresentationAccessEvent(shareCode, 'open_success');
    return () => {
      unsubscribe();
      window.clearInterval(poll);
    };
  }, [link, shareCode, hashSnapshot]);

  if ((!hashSnapshot && !link) || deniedCode) {
    const denied = mapPresentationAccessError(deniedCode ?? 'LINK_NOT_FOUND');
    return (
      <PresentationAccessDenied
        error={denied}
        onRetry={() => setRefreshTick((prev) => prev + 1)}
        onRegenerate={() => (window.location.href = '/')}
        onOpenEditor={() => (window.location.href = '/')}
      />
    );
  }

  // 우선순위: 동일 브라우저 실시간 싱크 > URL 해시 스냅샷 > Zustand store
  const renderNodes = syncNodes ?? hashSnapshot?.nodes ?? store.nodes;
  const renderCanvasWidth = hashSnapshot?.canvasWidthPx ?? store.diagram.canvasWidthPx;

  return (
    <main data-testid="presentation-route" data-share-code={shareCode} style={{ margin: '0 auto', padding: '16px' }}>
      <PresentationMode nodes={renderNodes} canvasWidthPx={renderCanvasWidth} />
    </main>
  );
}
