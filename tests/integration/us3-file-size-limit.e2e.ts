import { test, expect } from '@playwright/test';

test('US3: 5MB 초과 파일 거부', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('파일 크기 제한(5MB)을 초과했습니다')).not.toBeVisible();
});
