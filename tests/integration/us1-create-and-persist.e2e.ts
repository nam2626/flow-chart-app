import { test, expect } from '@playwright/test';

test('US1: 3개 노드 생성 후 새로고침 유지', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByRole('button', { name: '타원 추가' }).click();
  await page.reload();
  await expect(page.locator('[data-node-id]')).toHaveCount(3);
});
