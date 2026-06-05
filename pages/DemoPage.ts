import { Page, expect } from "@playwright/test";

export interface DemoFormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
}

export class DemoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openDemoForm() {
    await this.page.goto('https://www.invicti.com/get-demo');
  }

  async fillDemoForm(data: DemoFormData) {
    const emailField = this.page.locator('#Email');
    const firstNameField = this.page.locator('#First-Name');
    const lastNameField = this.page.locator('#Last-Name');
    const companyField = this.page.locator('#Company');
    const phoneField = this.page.locator('#Phone');

    await emailField.waitFor({ state: 'visible', timeout: 15000 });

    await emailField.fill(data.email);
    await expect(emailField).toHaveValue(data.email);

    await firstNameField.fill(data.firstName);
    await expect(firstNameField).toHaveValue(data.firstName);

    await lastNameField.fill(data.lastName);
    await expect(lastNameField).toHaveValue(data.lastName);

    await companyField.fill(data.company);
    await expect(companyField).toHaveValue(data.company);

    await phoneField.fill(data.phone);
    await expect(phoneField).toHaveValue(data.phone);
  }

  async assertSubmitButtonReady() {
    const submitButton = this.page.locator('input[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  }

  async submitForm() {
    const submitButton = this.page.locator('input[type="submit"]');
    await this.assertSubmitButtonReady();
    await Promise.all([
      this.page.waitForURL('**/getting-started', { timeout: 30000 }),
      submitButton.click(),
    ]);
  }
}
