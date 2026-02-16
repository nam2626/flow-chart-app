import React from 'react';
import { useFlowchartStore } from '@features/flowchart/store/flowchart-store';
import { isReservedShortcut, normalizeShortcutKey } from '@features/flowchart/shortcuts/next-step-shortcut';

export function ShortcutSettings(): JSX.Element {
  const shortcut = useFlowchartStore((s) => s.shortcut);

  const onChange = (value: string) => {
    const key = normalizeShortcutKey(value);
    const warning = isReservedShortcut(key) ? '예약 단축키입니다' : '';
    useFlowchartStore.setState((state) => ({
      shortcut: { ...state.shortcut, nextStepKey: key },
      progress: { ...state.progress, message: warning || state.progress.message }
    }));
  };

  return (
    <section style={{ marginTop: '12px' }}>
      <label>
        다음 단계 단축키
        <input
          value={shortcut.nextStepKey}
          onChange={(e) => onChange(e.target.value)}
          style={{ marginLeft: '8px', width: '80px' }}
        />
      </label>
    </section>
  );
}
