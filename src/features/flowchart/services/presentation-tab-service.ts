import type { FlowNode } from '@features/flowchart/models/flowchart-types';
import { presentationTheme } from '@features/flowchart/models/presentation-theme';
import { buildConnectorFlowRows } from '@features/flowchart/services/center-connector-service';

export interface OpenPresentationTabResult {
  ok: boolean;
  tab: Window | null;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderNode(node: FlowNode, currentOrder: number): string {
  const isActive = node.stepOrder === currentOrder;
  const borderRadius = node.shapeType === 'ellipse' ? '50%' : '8px';
  const fillColor = node.fillColor ?? presentationTheme.nodeFill;
  const borderColor = node.borderColor ?? presentationTheme.nodeBorder;
  const boxShadow = isActive ? presentationTheme.activeGlow : 'none';

  return `
    <div style="
      width:${node.width}px;
      min-height:${node.height}px;
      border-radius:${borderRadius};
      border:2px solid ${borderColor};
      background:${fillColor};
      color:${presentationTheme.nodeText};
      display:grid;
      place-items:center;
      text-align:center;
      padding:10px;
      box-shadow:${boxShadow};
      font-size:${presentationTheme.textSizeEm}em;
    ">${escapeHtml(node.label)}</div>
  `;
}

function renderConnector(rowHeight: number): string {
  const lineHeight = Math.max(8, rowHeight - 10);
  return `
    <div style="height:${rowHeight}px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
      <div style="width:2px; height:${lineHeight}px; background:${presentationTheme.arrowStroke};"></div>
      <div style="width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:10px solid ${presentationTheme.arrowStroke};"></div>
    </div>
  `;
}

function buildHtml(nodes: FlowNode[], currentOrder: number, title = 'Presentation'): string {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  const connectorRows = buildConnectorFlowRows(sorted);
  const canvasWidth = Math.max(320, ...sorted.map((node) => node.width), 320);

  const stackHtml = sorted
    .map((node, index) => {
      const connectorHtml = index < sorted.length - 1 ? renderConnector(connectorRows[index]?.rowHeight ?? 40) : '';
      return `${renderNode(node, currentOrder)}${connectorHtml}`;
    })
    .join('');

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    html, body { margin:0; padding:0; background:${presentationTheme.canvasBackground}; }
    body { font-family: sans-serif; }
  </style>
</head>
<body>
  <main style="min-height:100vh; display:flex; align-items:flex-start; justify-content:center; padding:24px;">
    <section data-testid="presentation-flow-container" style="display:flex; flex-direction:column; align-items:center; width:${canvasWidth}px; border:none; background:${presentationTheme.canvasBackground}; padding:24px 0 32px 0; min-height:320px;">
      ${stackHtml}
    </section>
  </main>
</body>
</html>`;
}

export function openPresentationTab(): OpenPresentationTabResult {
  const tab = window.open('', '_blank');
  if (!tab) {
    return { ok: false, tab: null };
  }
  return { ok: true, tab };
}

export function renderPresentationTab(tab: Window, nodes: FlowNode[], currentOrder: number, title?: string): void {
  if (tab === window) {
    return;
  }
  const doc = tab.document;
  doc.open();
  doc.write(buildHtml(nodes, currentOrder, title));
  doc.close();
}

