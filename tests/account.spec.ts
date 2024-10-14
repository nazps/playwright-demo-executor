import { faker } from '@faker-js/faker';
import { Account } from '../src/api/sobjects/account/Account';
import { test } from '../src/fixtures/fixtures';
import { expect} from '@playwright/test';
import { sleep} from '../src/helpers/waitHelpers'
import { AccountPage } from '../src/pages/account/AccountPage';
import { Tabs } from '../src/pages/basepage/record-page/TabsSwitcher';
import { AccountDetailsTab } from '../src/pages/account/AccountDetailsTab';
test.describe.configure({ mode: 'parallel' });

test.describe('Accounts Tests', ()=>{
    test.use({ storageState: 'playwright/.auth/admin.json' });  
    test.beforeEach(async ({landingPage})=>{
      await landingPage.goto();

    })

  test('create account and navigate to it', async ({ page, sfApi}) => {
    test.setTimeout(120000);
    const accountName:string = faker.company.name();
    const account = await new Account().withName(accountName).build(sfApi)
    expect(account.getId()).toBeDefined()
    const accountPage = new AccountPage(page, account)
    accountPage.goto()
    await accountPage.tabsStwitcher().switchToTab(Tabs.Details);
    const accountDetailsTab:AccountDetailsTab = new AccountDetailsTab(page)
    const updatedName = faker.company.name();
    await accountDetailsTab.editFieldValue('Account Name', updatedName);
    const actualNameInDetails = await accountDetailsTab.getFieldValue('Account Name')
    expect(actualNameInDetails).toBe(updatedName)
    await accountDetailsTab.editFieldValue('Type', 'Prospect');
    const actualAccountType = await accountDetailsTab.getFieldValue('Type');
    expect(actualAccountType).toBe('Prospect')
    await accountDetailsTab.editFieldValue('Industry', 'Chemicals');
    const actualIndustry = await accountDetailsTab.getFieldValue('Industry');
    expect(actualIndustry).toBe('Chemicals')

    await accountPage.platformActions().clickNewCase()
    await sleep(15000)
  })
});
