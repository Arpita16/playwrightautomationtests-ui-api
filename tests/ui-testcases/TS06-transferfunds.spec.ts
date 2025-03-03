import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { TransferFundsPage } from "../../pages/transferfunds";
import userDataJson from "../../utils/userData.json";
import checkingAccountJson from "../../utils/checkingAccount.json";
import savingsAccountJson from "../../utils/savingsAccount.json";

test.describe("Parabank Transfer Funds Tests", () => {
    
    let loginPage: LoginPage;
    let transferFundsPage: TransferFundsPage;
    
    let page: any;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userDataJson);
        await loginPage.validateLoginSuccess();
       
    });

    test.beforeEach(async () => {
      transferFundsPage = new TransferFundsPage(page);

        
    });

    test("Transfer $10 from Savings to Checking", async () => {
        await transferFundsPage.navigateToTransferFunds();
        await transferFundsPage.transferFunds("10", savingsAccountJson.accountNumber, checkingAccountJson.accountNumber);
        await transferFundsPage.validateTransferSuccess();
    });

    test("Transfer $25 from Savings to Checking", async () => {
        await transferFundsPage.navigateToTransferFunds();
        await transferFundsPage.transferFunds("25", savingsAccountJson.accountNumber, checkingAccountJson.accountNumber);
        await transferFundsPage.validateTransferSuccess();
    });

    test.afterAll(async () => {
        await page.close();
    });
});
