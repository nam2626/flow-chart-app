import { test, expect } from '@playwright/test';

test('flowchart export e2e', async ({ page }) => {
  await page.goto('/');
  await page.getByText('사각형 추가').click();
  await page.getByLabel('step-text-1').fill('E2E 단계');
  await page.getByText('SVG 내보내기').click();
  await expect(page.getByText('SVG 내보내기가 완료되었습니다.')).toBeVisible();
});
