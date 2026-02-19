# Code Convention Validation: Flowchart UI Redesign

## CCR-001 Korean Rationale Comments

- [X] 변경 파일의 주석은 한국어를 사용한다.
- [X] 주석은 동작 설명보다 의도/근거 중심으로 작성한다.
- [X] 신규 주석이 필요한 지점(정렬/레이아웃 정책) 점검을 완료했다.

## CCR-002 Naming Rules

- [X] 타입/컴포넌트 이름은 `PascalCase`를 유지했다.
- [X] 변수/함수 이름은 `camelCase`를 유지했다.
- [X] 상수 이름은 `UPPER_SNAKE_CASE` 또는 기존 규칙을 유지했다.
- [X] 파일/폴더 이름은 `kebab-case`를 유지했다.

## CCR-003 Structure Simplicity

- [X] 기능 중심 기존 폴더 구조(`src/features/flowchart`)를 유지했다.
- [X] 불필요한 깊은 하위 계층 추가 없이 파일을 배치했다.

## Reviewed Scope

- `src/features/flowchart/components/diagram-canvas.tsx`
- `src/features/flowchart/components/diagram-toolbar.tsx`
- `src/features/flowchart/components/flow-layout-stack.tsx`
- `src/features/flowchart/components/step-order-panel.tsx`
- `src/features/flowchart/models/editor-layout-sections.ts`
- `src/features/flowchart/models/editor-visual-rules.ts`
