import { faker } from '@faker-js/faker';
import { Account } from '../src/api/sobjects/account/Account';
import { test } from '../src/fixtures/fixtures';
import { expect} from '@playwright/test';
import { sleep} from '../src/helpers/waitHelpers'
import { AccountPage } from '../src/pages/account/AccountPage';
test.describe.configure({ mode: 'parallel' });

test.describe('Accounts Tests', ()=>{
  let accountId = '';
  test.use({ storageState: 'playwright/.auth/admin.json' });  
  test.beforeEach(async ({landingPage})=>{
    await landingPage.goto();
  })

  test('should be logged in', async ({ landingPage }) => {
    const avatar = landingPage.avatar;

    await expect(avatar).toHaveCSS('display', 'inline-block')
  });

  test('should be logged in 1', async ({ landingPage }) => {
    const avatar = landingPage.avatar;

    
    await expect(avatar).toHaveCSS('display', 'inline-block')
  });
})

test('should be logged in 2', async ({ loginPage }) => {
  await loginPage.goto();
  
  // Expect a login button to be visible
  await expect(loginPage.loginBtn).toBeVisible()
})

test('should create account', async ({ page, sfApi}) => {
  const accountName:string = faker.company.name();
  const account = await new Account().withName(accountName).build(sfApi)
  expect(account.getId()).toBeDefined()
  const accountPage = new AccountPage(page, account)

  accountPage.goto()
  await sleep(5000);
})

test('should create another account', async ({sfApi}) => {
  const accountName:string = faker.company.name();
  const account = await new Account().withName(accountName).build(sfApi)

  expect(account.getId()).toBeDefined()
})
