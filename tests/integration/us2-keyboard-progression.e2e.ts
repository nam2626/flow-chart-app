import { test, expect } from '@playwright/test';

test('US2: 기본/변경 단축키 진행', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '사각형 추가' }).click();
  await page.getByRole('button', { name: '타원 추가' }).click();
  await page.getByLabel('step-text-1').fill('시작');
  await page.getByLabel('step-text-2').fill('다음');
  await page.getByRole('button', { name: '프레젠테이션 시작' }).click();
  await page.keyboard.press('N');
  await expect(page.getByText('다음 단계로 이동했습니다')).toBeVisible();
});
