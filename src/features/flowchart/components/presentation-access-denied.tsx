import React from 'react';
import type { PresentationAccessErrorViewModel } from '@features/flowchart/services/presentation-error-service';

interface PresentationAccessDeniedProps {
  error: PresentationAccessErrorViewModel;
  onRetry?: () => void;
  onRegenerate?: () => void;
  onOpenEditor?: () => void;
}

export function PresentationAccessDenied({ error, onRetry, onRegenerate, onOpenEditor }: PresentationAccessDeniedProps): JSX.Element {
  return (
    <main data-testid="presentation-route-denied" style={{ margin: '0 auto', padding: '24px', maxWidth: '680px' }}>
      <h1>{error.title}</h1>
      <p>{error.message}</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {error.actions.includes('retry') ? <button onClick={onRetry}>재시도</button> : null}
        {error.actions.includes('regenerate') ? <button onClick={onRegenerate}>링크 재생성</button> : null}
        {error.actions.includes('open-editor') ? <button onClick={onOpenEditor}>편집 화면으로 이동</button> : null}
      </div>
    </main>
  );
}
