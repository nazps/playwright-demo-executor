import { expect, type Locator, type Page } from '@playwright/test';


export class LandingPage {
    readonly page: Page;
    readonly avatar: Locator;
    readonly url: string = process.env.ORG_URL ? process.env.ORG_URL : '';

    constructor(page: Page) {
        this.page = page;
        this.avatar = page.getByAltText('User');
    }

    async goto() : Promise<LandingPage> {
        await this.page.goto(this.url);
        return this
      }
}