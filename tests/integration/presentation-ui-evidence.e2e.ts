import { test } from '@playwright/test';

test('presentation ui evidence capture', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'test-results/presentation-before.png', fullPage: true });

  await page.getByText('사각형 추가').click();
  await page.getByLabel('step-text-1').fill('증적 단계');
  await page.screenshot({ path: 'test-results/presentation-after.png', fullPage: true });

  await page.getByText('프레젠테이션 시작').click();
  await page.screenshot({ path: 'test-results/presentation-active.png', fullPage: true });
});
