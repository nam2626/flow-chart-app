import { test, expect } from '@playwright/test';

test('presentation direct url opens read-only screen', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const payload = {
      d1: {
        diagramId: 'd1',
        shareCode: 'ABC123',
        status: 'active',
        documentTitle: '테스트 문서',
        createdAt: new Date().toISOString(),
        regeneratedAt: null
      }
    };
    localStorage.setItem('flowchart-presentation-links-v1', JSON.stringify(payload));
  });

  await page.goto('/p/ABC123');
  await expect(page.getByTestId('presentation-route')).toBeVisible();
});
