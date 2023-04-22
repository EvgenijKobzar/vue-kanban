import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.locator('.d-flex > span:nth-child(3)').first().click();
	await page.getByText('test').click();
	await page.locator('.v-snackbar__actions > .v-btn').click();
});