import { Page, expect } from "@playwright/test";

export class DemoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openDemoForm() {
        await this.page.locator('.navbar_menu-button').getByRole('link', { name: 'Get a demo' }).click();

    }

    async fillInEmailDetails(email: string) {
        await this.page.locator('#email').fill(email);
        await expect(this.page.locator('#email')).toHaveValue(email);
    }

    async clickNext() {
        await this.page.getByRole('link', { name: 'Next →' }).click();
    }
    async fillInFirstNameLastNameAndCompanyDetails(firstName: string, lastName: string, company: string) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await expect(this.page.getByRole('textbox', { name: 'First Name' })).toHaveValue(firstName);

        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
        await expect(this.page.getByRole('textbox', { name: 'Last Name' })).toHaveValue(lastName);

        await this.page.getByRole('textbox', { name: 'Company' }).fill(company);
        await expect(this.page.getByRole('textbox', { name: 'Company' })).toHaveValue(company);
    }

    async submitPhone(phone: string) {
        await this.page.locator('#Phone').fill(phone);
        await expect(this.page.locator('#Phone')).toHaveValue(phone);
    }
    async assertSubmitButtonReady() {
        const submitButton = this.page.locator('[data-form="submit-btn"]');
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
    }



}