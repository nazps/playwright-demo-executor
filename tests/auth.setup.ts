import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login/LoginPage';


const adminFile = 'playwright/.auth/admin.json';
const username: string = process.env.USERNAME ? process.env.USERNAME : '';
const password: string = process.env.PASSWORD ? process.env.PASSWORD : '';

setup('authenticate as admin', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto();
    const avatar = (await loginPage.login(username, password)).avatar;
    await expect(avatar).toHaveCSS('display', 'inline-block')
  await page.context().storageState({ path: adminFile });
});