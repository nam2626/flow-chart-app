import { test, expect } from '@playwright/test';

test('presentation redesign colors e2e', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByLabel('step-text-1').fill('본문');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();

  const node = page.getByTestId('presentation-node-1');
  await expect(node).toBeVisible();
  await expect(node).toHaveCSS('border-color', 'rgb(15, 76, 129)');
});
