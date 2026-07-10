import { expect, test } from '@playwright/test'

test('loads the baseline app', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Baseline is ready' }),
  ).toBeVisible()
  await expect(page.getByText('SkiNet practice app')).toBeVisible()
})
