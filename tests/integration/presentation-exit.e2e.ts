import { test, expect } from '@playwright/test';

test('presentation exit e2e', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByLabel('step-text-1').fill('편집 복귀 확인');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();
  await page.getByRole('button', { name: '프레젠테이션 종료' }).click();
  await expect(page.getByLabel('step-text-1')).toHaveValue('편집 복귀 확인');
});
