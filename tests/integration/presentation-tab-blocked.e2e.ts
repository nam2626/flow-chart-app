import { expect, test } from '@playwright/test';

test('presentation start blocked when popup is denied', async ({ page }) => {
  await page.addInitScript(() => {
    window.open = () => null;
  });
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByLabel('step-text-1').fill('시작');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();
  await expect(page.getByText(/차단/)).toBeVisible();
});
