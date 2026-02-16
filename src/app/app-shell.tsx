import React from 'react';
import { DiagramCanvas } from '@features/flowchart/components/diagram-canvas';

export function AppShell(): JSX.Element {
  return (
    <main style={{ margin: '0 auto', padding: '16px', maxWidth: '1400px' }}>
      <DiagramCanvas />
    </main>
  );
}
