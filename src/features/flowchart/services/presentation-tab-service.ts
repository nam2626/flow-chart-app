import type { FlowNode, PresentationShadowSettings } from '@features/flowchart/models/flowchart-types';
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

function buildShadowCss(shadow: PresentationShadowSettings | undefined, isActive: boolean): string {
  if (!isActive) return 'none';
  if (!shadow) return presentationTheme.activeGlow;
  const r = parseInt(shadow.color.replace('#', '').slice(0, 2), 16);
  const g = parseInt(shadow.color.replace('#', '').slice(2, 4), 16);
  const b = parseInt(shadow.color.replace('#', '').slice(4, 6), 16);
  const custom = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px rgba(${r},${g},${b},${shadow.opacity})`;
  return `${custom}, ${presentationTheme.activeGlow}`;
}

function renderNode(node: FlowNode, currentOrder: number, shadow?: PresentationShadowSettings): string {
  const isActive = node.stepOrder === currentOrder;
  const borderRadius = node.shapeType === 'ellipse' ? '50%' : '8px';
  const fillColor = node.fillColor ?? presentationTheme.nodeFill;
  const borderColor = node.borderColor ?? presentationTheme.nodeBorder;
  const boxShadow = buildShadowCss(shadow, isActive);

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

function buildHtml(nodes: FlowNode[], currentOrder: number, title = 'Presentation', shadow?: PresentationShadowSettings): string {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  const connectorRows = buildConnectorFlowRows(sorted);
  const canvasWidth = Math.max(320, ...sorted.map((node) => node.width), 320);

  const stackHtml = sorted
    .map((node, index) => {
      const connectorHtml = index < sorted.length - 1 ? renderConnector(connectorRows[index]?.rowHeight ?? 40) : '';
      return `${renderNode(node, currentOrder, shadow)}${connectorHtml}`;
    })
    .join('');

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    html, body { margin:0; padding:0; background:transparent; }
    body { font-family: sans-serif; }
  </style>
</head>
<body>
  <main style="min-height:100vh; display:flex; align-items:center; justify-content:center;">
    <section data-testid="presentation-flow-container" style="display:flex; flex-direction:column; align-items:center; width:${canvasWidth}px; border:none; background:transparent; padding:32px 40px; overflow:visible;">
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

export function renderPresentationTab(tab: Window, nodes: FlowNode[], currentOrder: number, title?: string, shadow?: PresentationShadowSettings): void {
  if (tab === window) {
    return;
  }
  const doc = tab.document;
  doc.open();
  doc.write(buildHtml(nodes, currentOrder, title, shadow));
  doc.close();
}

