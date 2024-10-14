import { expect, type Locator, type Page } from '@playwright/test';
import { LandingPage } from '../home/LandingPage';
const ORG_URL: string = process.env.ORG_URL ? process.env.ORG_URL : 'https://test.salesforce.com';


export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('xpath=//input[@name="username"]');
    this.passwordInput = page.locator('xpath=//input[@name="pw"]');
    this.loginBtn = page.locator('xpath=//input[@name="Login"]');
  }

  async goto() : Promise<LoginPage> {
    await this.page.goto(ORG_URL);
    return this
  }

  async login(username:string, password:string ) : Promise<LandingPage> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginBtn.click()
    return new LandingPage(this.page);
  }
}