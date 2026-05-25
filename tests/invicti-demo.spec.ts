import { test } from '@playwright/test';
import { DemoPage } from '../pages/DemoPage';

test.beforeEach(async({page})=>{
    await page.goto("https://www.invicti.com");
});

test('Invicti Get a Demo - fills form and validates inputs', async ({ page }) => {
  const demoPage = new DemoPage(page);
  await demoPage.openDemoForm();
  await demoPage.fillInEmailDetails('elsy.smith@tana.com');
  await demoPage.clickNext();
  await demoPage.fillInFirstNameLastNameAndCompanyDetails('Elsy', 'Smith', 'Tana');
  await demoPage.clickNext();
  await demoPage.submitPhone('0788652345');
  await demoPage.assertSubmitButtonReady();

})