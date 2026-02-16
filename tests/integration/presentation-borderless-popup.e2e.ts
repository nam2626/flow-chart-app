import { expect, test } from '@playwright/test';

test('popup presentation container is borderless', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByLabel('step-text-1').fill('발표');

  const popupPromise = context.waitForEvent('page');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');

  const container = popup.locator('[data-testid="presentation-flow-container"]');
  await expect(container).toHaveCount(1);
  await expect(container).toHaveCSS('border-top-style', 'none');
});
