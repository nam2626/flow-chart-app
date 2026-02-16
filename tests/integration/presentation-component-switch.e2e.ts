import { test, expect } from '@playwright/test';

test('presentation component switch e2e', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByLabel('step-text-1').fill('단계 본문 1');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();

  await expect(page.getByTestId('presentation-mode-root')).toBeVisible();
  await expect(page.getByText('단계 1')).toHaveCount(0);
});
