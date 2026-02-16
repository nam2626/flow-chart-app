import { expect, test } from '@playwright/test';

test('presentation shows highlighted active node and centered connector row', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByLabel('step-text-1').fill('입력');
  await page.getByLabel('step-text-2').fill('출력');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();

  const connectorRow = page.getByTestId('connector-row-1');
  await expect(connectorRow).toHaveCount(1);
  await expect(page.getByTestId('presentation-node-1')).toBeVisible();
});
