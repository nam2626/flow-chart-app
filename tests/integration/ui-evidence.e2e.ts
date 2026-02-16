import { test } from '@playwright/test';

test('ui evidence capture', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'test-results/ui-before.png', fullPage: true });

  await page.getByText('사각형 추가').click();
  await page.getByLabel('step-text-1').fill('검증 단계');
  await page.screenshot({ path: 'test-results/ui-after.png', fullPage: true });

  await page.getByText('SVG 내보내기').click();
  await page.screenshot({ path: 'test-results/export-success.png', fullPage: true });
});
