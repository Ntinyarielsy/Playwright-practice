import { test, expect } from '@playwright/test';
import { DemoPage } from '../pages/DemoPage';

test.beforeEach(async ({ page }) => {
  const demoPage = new DemoPage(page);
  await demoPage.openDemoForm();
});

test('Invicti Get a Demo - fills form and validates inputs', async ({ page }) => {
  const demoPage = new DemoPage(page);

  await demoPage.fillDemoForm({
    email: 'elsy.smith@tana.com',
    firstName: 'Elsy',
    lastName: 'Smith',
    company: 'Tana',
    phone: '0788652345',
  });

  await demoPage.submitForm();

  await page.waitForURL('**/getting-started', { timeout: 30000 });
  const thankHeading = page.getByRole('heading', { name: 'Thank you!' }).first();
  await expect(thankHeading).toBeVisible();
});