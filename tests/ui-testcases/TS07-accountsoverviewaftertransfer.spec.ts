import { test,expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { AccountsOverviewPage } from "../../pages/accountsoverview";
import userData from "../../utils/userData.json"
import savingsAccountJson from "../../utils/savingsAccount.json";

test.describe("Parabank Savings Account Transactions Validation", () => {
    let loginPage: LoginPage;
    let accountsOverviewPage: AccountsOverviewPage;
    

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        accountsOverviewPage = new AccountsOverviewPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userData);
        await loginPage.validateLoginSuccess();
    });

    test("Verify transactions in Savings Account", async () => {
        await accountsOverviewPage.navigateToAccountsOverview();
        await accountsOverviewPage.selectAccount(savingsAccountJson.accountNumber);
        await accountsOverviewPage.validateAccountDetailsAfterTransfer(savingsAccountJson.accountNumber);

        await accountsOverviewPage.transactionCount();

        
         await accountsOverviewPage.validateBalanceAmount();
        
        const isFound= await accountsOverviewPage.validateTransactionDetails("10");
        expect(isFound).toBeTruthy();
        await accountsOverviewPage.validateTransactionDetails("25");
        expect(isFound).toBeTruthy();
    });


 test.afterAll(async ({ page }) => {
        await page.close();
    });
});
