import { test, expect } from '@playwright/test';

test('denied screen shows recovery hint', async ({ page }) => {
  await page.goto('/p/INVALID1');
  await expect(page.getByTestId('presentation-route-denied')).toBeVisible();
  await expect(page.getByRole('heading', { name: '링크를 찾을 수 없습니다' })).toBeVisible();
});
