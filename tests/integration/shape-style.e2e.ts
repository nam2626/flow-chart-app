import { expect, test } from '@playwright/test';

test('shape colors persist after reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();

  const fillPicker = page.getByLabel('fill-color-1');
  const borderPicker = page.getByLabel('border-color-1');
  await fillPicker.fill('#dbeafe');
  await borderPicker.fill('#1d4ed8');

  await page.reload();
  await expect(page.getByLabel('fill-color-1')).toHaveValue('#dbeafe');
  await expect(page.getByLabel('border-color-1')).toHaveValue('#1d4ed8');
});
