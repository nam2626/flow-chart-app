# Quickstart: Remove Presentation Border

## Prerequisites

- Node.js 및 npm 설치
- 의존성 설치 완료 (`npm install`)
- 브랜치: `001-remove-presentation-border`

## 1) 개발 서버 실행

```bash
npm run dev
```

## 2) 수동 검증 시나리오

### Scenario A: 프레젠테이션 모드 무테두리
1. 편집 화면에서 플로우차트 노드를 2개 이상 생성한다.
2. 프레젠테이션 모드로 전환한다.
3. 플로우차트 컨테이너 외곽에 테두리(실선/점선)가 없는지 확인한다.

### Scenario B: 모드 반복 전환 안정성
1. 편집 ↔ 프레젠테이션 모드를 10회 반복 전환한다.
2. 매 전환 후 프레젠테이션 컨테이너가 무테두리인지 확인한다.

### Scenario C: 단계 이동 회귀 확인
1. 프레젠테이션 모드에서 다음/이전 단계 이동을 수행한다.
2. 단계 강조/이동은 정상 동작하고 컨테이너는 계속 무테두리인지 확인한다.

### Scenario D: 빈 상태 검증
1. 노드가 없는 상태에서 프레젠테이션 모드에 진입한다.
2. 빈 상태에서도 컨테이너 테두리가 나타나지 않는지 확인한다.

### Scenario E: 팝업 프레젠테이션 검증
1. 프레젠테이션 시작으로 새 탭(팝업)을 연다.
2. 팝업 화면의 플로우차트 컨테이너가 무테두리인지 확인한다.

## 3) 자동 테스트 실행

```bash
npm run test:unit
npm run test:integration
npm run test:e2e
npm run lint
npm run typecheck
```

## Expected Result

- 프레젠테이션 컨테이너 테두리 재노출 회귀 0건
- 기존 단계 이동/표시 동작 회귀 0건
- lint/typecheck/test 전체 통과
