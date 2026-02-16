import React from 'react';

interface ImportConflictDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ImportConflictDialog({ open, onClose }: ImportConflictDialogProps): JSX.Element | null {
  if (!open) {
    return null;
  }

  return (
    <div style={{ border: '1px solid #f59e0b', padding: '12px', marginTop: '12px' }}>
      <p>병합 충돌이 감지되었습니다. 기본값은 가져온 파일 우선입니다.</p>
      <button onClick={onClose}>확인</button>
    </div>
  );
}
