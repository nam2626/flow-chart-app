import React from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.split('').map((c) => `${c}${c}`).join('') : raw;
  if (full.length !== 6) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16)
  };
}

export function buildBoxShadow(settings: {
  enabled: boolean;
  color: string;
  blur: number;
  spread: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
}): string {
  if (!settings.enabled) return 'none';
  const rgb = hexToRgb(settings.color) ?? { r: 15, g: 76, b: 129 };
  return `${settings.offsetX}px ${settings.offsetY}px ${settings.blur}px ${settings.spread}px rgba(${rgb.r},${rgb.g},${rgb.b},${settings.opacity})`;
}

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  fontSize: '12px',
  color: '#374151'
};

const rangeStyle: React.CSSProperties = { width: '100%', accentColor: '#0f4c81' };

export function PresentationShadowPanel(): JSX.Element {
  const shadow = useFlowchartStore((s) => s.presentationShadow);
  const setPresentationShadow = useFlowchartStore((s) => s.setPresentationShadow);

  const preview = buildBoxShadow(shadow);

  return (
    <section
      aria-label="presentation-shadow-panel"
      data-testid="presentation-shadow-panel"
      style={{ display: 'grid', gap: '10px', padding: '12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>박스 그림자</span>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={shadow.enabled}
            onChange={(e) => setPresentationShadow({ enabled: e.target.checked })}
          />
          사용
        </label>
      </div>

      {/* 미리보기 */}
      <div
        aria-label="shadow-preview"
        style={{
          width: '100%',
          height: '48px',
          borderRadius: '8px',
          background: '#f0f7ff',
          border: `2px solid ${shadow.color}`,
          boxShadow: preview,
          transition: 'box-shadow 0.15s'
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', opacity: shadow.enabled ? 1 : 0.4, pointerEvents: shadow.enabled ? 'auto' : 'none' }}>
        <label style={labelStyle}>
          색상
          <input
            type="color"
            value={shadow.color}
            onChange={(e) => setPresentationShadow({ color: e.target.value })}
            style={{ height: '28px', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
          />
        </label>

        <label style={labelStyle}>
          불투명도 <span style={{ color: '#6b7280' }}>{Math.round(shadow.opacity * 100)}%</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={shadow.opacity}
            onChange={(e) => setPresentationShadow({ opacity: Number(e.target.value) })}
            style={rangeStyle}
          />
        </label>

        <label style={labelStyle}>
          블러 <span style={{ color: '#6b7280' }}>{shadow.blur}px</span>
          <input
            type="range"
            min={0}
            max={80}
            step={1}
            value={shadow.blur}
            onChange={(e) => setPresentationShadow({ blur: Number(e.target.value) })}
            style={rangeStyle}
          />
        </label>

        <label style={labelStyle}>
          번짐(spread) <span style={{ color: '#6b7280' }}>{shadow.spread}px</span>
          <input
            type="range"
            min={-20}
            max={40}
            step={1}
            value={shadow.spread}
            onChange={(e) => setPresentationShadow({ spread: Number(e.target.value) })}
            style={rangeStyle}
          />
        </label>

        <label style={labelStyle}>
          X 오프셋 <span style={{ color: '#6b7280' }}>{shadow.offsetX}px</span>
          <input
            type="range"
            min={-40}
            max={40}
            step={1}
            value={shadow.offsetX}
            onChange={(e) => setPresentationShadow({ offsetX: Number(e.target.value) })}
            style={rangeStyle}
          />
        </label>

        <label style={labelStyle}>
          Y 오프셋 <span style={{ color: '#6b7280' }}>{shadow.offsetY}px</span>
          <input
            type="range"
            min={-40}
            max={40}
            step={1}
            value={shadow.offsetY}
            onChange={(e) => setPresentationShadow({ offsetY: Number(e.target.value) })}
            style={rangeStyle}
          />
        </label>
      </div>
    </section>
  );
}
