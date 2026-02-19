# Quickstart - 프레젠테이션 별도 접속 링크

## Prerequisites
- Node.js LTS
- Install dependencies: `npm install`

## Run
- Start app: `npm run dev`
- Open editor, load/create diagram, and open presentation controls

## Core Validation
1. Generate presentation link from editor.
2. Open link in new browser tab and verify read-only presentation screen.
3. Verify browser tab title shows document name.
4. Save changes in editor and verify presentation screen updates automatically.

## Revocation Validation
1. Keep an existing presentation tab open.
2. Regenerate link from editor.
3. Verify previous link access is denied immediately.
4. Verify already-open presentation tab transitions to denied state immediately.

## OBS Validation
1. Register presentation URL as OBS Browser Source.
2. Verify first connection succeeds.
3. Regenerate link and verify previous source URL is blocked.

## Quality Gates
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Unit tests: `npm run test:unit`
- Integration tests: `npm run test:integration`
- E2E tests: `npm run test:e2e`

## Performance Measurement Baseline
- Browser: Chrome latest (desktop)
- Device baseline: 4-core CPU, 16GB RAM
- Network baseline: wired LAN or equivalent stable network
- Metrics:
  - entry render p95 <= 300ms
  - monthly entry failure rate < 1%
  - repeated entry variance p95 <= 1s
  - bundle size/network call/memory deltas recorded before vs after

## Final Validation Notes
- [ ] 링크 생성/복사/재생성 UX 문구 확인
- [ ] 무효 링크 접근 시 복구 행동 노출 확인
- [ ] 성능 예산 측정치와 체크리스트 동기화
