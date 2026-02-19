import React, { useEffect, useMemo, useState } from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';
import { PresentationMode } from '@features/flowchart/components/presentation-mode';
import { PresentationAccessDenied } from '@features/flowchart/components/presentation-access-denied';
import { resolvePresentationLinkByCode } from '@features/flowchart/services/presentation-link-service';
import {
  mapPresentationAccessError,
  type PresentationAccessErrorCode
} from '@features/flowchart/services/presentation-error-service';
import { recordPresentationAccessEvent } from '@features/flowchart/services/presentation-access-event-service';
import { readPresentationSyncSnapshot, subscribePresentationSync } from '@features/flowchart/services/presentation-session-sync-service';

interface PresentationRouteProps {
  shareCode: string;
}

export function PresentationRoute({ shareCode }: PresentationRouteProps): JSX.Element {
  const store = useFlowchartStore();
  const [deniedCode, setDeniedCode] = useState<PresentationAccessErrorCode | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const link = useMemo(() => resolvePresentationLinkByCode(shareCode), [shareCode, store.presentationLink, refreshTick]);

  useEffect(() => {
    if (!link) {
      setDeniedCode('LINK_NOT_FOUND');
      return;
    }

    document.title = link.documentTitle;
    const unsubscribe = subscribePresentationSync(() => {
      recordPresentationAccessEvent(shareCode, 'sync_update');
      setRefreshTick((prev) => prev + 1);
    });

    const poll = window.setInterval(() => {
      const active = resolvePresentationLinkByCode(shareCode);
      if (!active) {
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
  }, [link, shareCode]);

  if (!link || deniedCode) {
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

  return (
    <main data-testid="presentation-route" data-share-code={shareCode} style={{ margin: '0 auto', padding: '16px' }}>
      <PresentationMode nodes={store.nodes} canvasWidthPx={store.diagram.canvasWidthPx} />
    </main>
  );
}
