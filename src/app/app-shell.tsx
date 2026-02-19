import React from 'react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';
import { PresentationRoute } from '@features/flowchart/components/presentation-route';

export function AppShell(): JSX.Element {
  const match = window.location.pathname.match(/^\/p\/([A-Za-z0-9_-]+)$/);
  if (match) {
    return <PresentationRoute shareCode={match[1]} />;
  }

  return (
    <main style={{ margin: '0 auto', padding: '16px', maxWidth: '1400px' }}>
      <DiagramCanvas />
    </main>
  );
}
