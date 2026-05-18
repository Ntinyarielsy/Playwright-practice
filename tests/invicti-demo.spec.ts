import { test, expect } from '@playwright/test';

test('Invicti Get a Demo - fills form and validates inputs', async ({ page }) => {
  // navigate to the Invicti home page
  await page.goto('https://www.invicti.com');
  // click on Get a demo butoon on the top header
  //await page.getByRole('link', {name:'Get a demo'}).first().click();
  await page.locator('.navbar_menu-button').getByRole('link', { name: 'Get a demo'}).click();

  // Select the 'Work email' input,fill it and assert the input value
  await page.locator('#email').fill('elsy.smith@tana.com');
  await expect(page.locator('#email')).toHaveValue('elsy.smith@tana.com');

  // Click on the Next button
  await page.getByRole('link', { name: 'Next →' }).click();

  // Enter first name
  await page.getByRole('textbox', { name: 'First Name' }).fill('Elsy');
  expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('Elsy');

  // Enter last name
  await page.locator('#LastName').fill('Smith');
  expect(page.locator('#LastName')).toHaveValue('Smith');

  // Enter the company name
  await page.locator('#Company').fill('Tana')
  expect(page.locator('#Company')).toHaveValue('Tana');

  // Click on the Next button
  await page.getByRole('link', { name: 'Next →' }).click();

  // Enter the phone number
  await page.locator('#Phone').fill('0788652345')
  expect(page.locator('#Phone')).toHaveValue('0788652345');

  // click on get demo button
  await page.locator('[data-form="submit-btn"]').click()

  // Assert the success state renders after submission
  await expect(page.getByRole('heading', { name: 'Thank you!' })).toBeVisible();
  await expect(page.getByText(/The next step will be setting you up on a quick 10-15 minute demo call/i)).toBeVisible();
});
