import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { AccountsOverviewPage } from "../../pages/accountsoverview";
import userData from "../../utils/userData.json"
import savingsAccount from "../../utils/savingsAccount.json"


test.describe("Parabank Account Validation", () => {
    let page: any;
    let context:any;
    let loginPage: LoginPage;
    let accountsOverviewPage: AccountsOverviewPage;
  

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
    });
    test.beforeEach(async () => {
        loginPage = new LoginPage(page);
        accountsOverviewPage = new AccountsOverviewPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userData);
        await loginPage.validateLoginSuccess();
    });

    test("Navigate to Accounts Overview and Validate Account", async () => {
        await accountsOverviewPage.navigateToAccountsOverview();
        await accountsOverviewPage.selectAccount(savingsAccount.accountNumber);
        await accountsOverviewPage.validateAccountDetails(savingsAccount.accountNumber);
               
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });
});
