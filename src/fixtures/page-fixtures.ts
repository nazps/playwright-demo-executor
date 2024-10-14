import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { LandingPage } from '../pages/home/LandingPage';
import { AccountPage } from '../pages/account/AccountPage';
import { Account } from '../api/sobjects/account/Account';


type Pages = {
    loginPage: LoginPage;
    landingPage: LandingPage;
  };


  export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
      // Set up the fixture.
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },
  
    landingPage: async ({ page }, use) => {
      await use(new LandingPage(page));
    },
  });
  export { expect } from '@playwright/test';