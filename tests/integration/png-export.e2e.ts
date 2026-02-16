import { test, expect } from '@playwright/test';

test('png export flow e2e', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByLabel('step-text-1').fill('본문');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();
  await page.getByRole('button', { name: 'PNG 내보내기' }).click();

  await expect(page.getByText('PNG 내보내기가 완료되었습니다.')).toBeVisible();
});
