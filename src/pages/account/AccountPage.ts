import { expect, type Locator, type Page } from '@playwright/test';
import { RecordPage } from '../basepage/record-page/RecordPage';
import { Account } from '../../api/sobjects/account/Account';
import { PlatformActionsComponent } from '../basepage/global/PlatformActionsComponent';

export class AccountPage extends RecordPage<Account> {
    accountPageName: Locator;
    entityLabelName: Locator;
    constructor(page:Page, acc:Account) {
        super(page, acc);
        this.accountPageName = page.getByText(acc.getName())
        this.entityLabelName = page.getByText('Account')
        
    }

    async getScreenAccountName():Promise<string> {
        await expect(this.accountPageName).toBeVisible()
        return this.sobject.getName()
    }



}