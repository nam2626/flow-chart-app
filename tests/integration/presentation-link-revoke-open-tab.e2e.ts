import { test, expect } from '@playwright/test';

test('opened presentation tab is revoked after regenerate', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const payload = {
      d1: {
        diagramId: 'd1',
        shareCode: 'OLD111',
        status: 'active',
        documentTitle: '테스트 문서',
        createdAt: new Date().toISOString(),
        regeneratedAt: null
      }
    };
    localStorage.setItem('flowchart-presentation-links-v1', JSON.stringify(payload));
  });

  const presentationPage = await context.newPage();
  await presentationPage.goto('/p/OLD111');
  await expect(presentationPage.getByTestId('presentation-route')).toBeVisible();

  await page.evaluate(() => {
    const payload = {
      d1: {
        diagramId: 'd1',
        shareCode: 'NEW222',
        status: 'active',
        documentTitle: '테스트 문서',
        createdAt: new Date().toISOString(),
        regeneratedAt: new Date().toISOString()
      }
    };
    localStorage.setItem('flowchart-presentation-links-v1', JSON.stringify(payload));
  });

  await expect(presentationPage.getByTestId('presentation-route-denied')).toBeVisible();
});
