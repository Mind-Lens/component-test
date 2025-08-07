import { test, expect } from '@playwright/test';

test.describe('Storybook cross-browser', () => {
    test('should load the Storybook homepage', async ({ page }) => {
        await page.goto('http://localhost:6006');
        await expect(page).toHaveTitle(/Storybook/);
    });
});