import { test, expect } from '@playwright/test';

test('presentation mode e2e', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByRole('button', { name: '타원 추가' }).click();

  await page.getByLabel('step-text-1').fill('준비');
  await page.getByLabel('step-text-2').fill('실행');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();

  await expect(page.getByTestId('connector-row-1')).toHaveCount(1);
  await page.getByRole('button', { name: '다음 단계' }).click();
  await expect(page.getByText('(2/2)')).toBeVisible();
});
