import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { OpenAccountPage } from "../../pages/openaccount";
import userDataJson from "../../utils/userData.json"
import { AccountsOverviewPage } from '../../pages/accountsoverview';

test.describe("Parabank Account Tests", () => {
    let loginPage: LoginPage;
    let openAccountPage: OpenAccountPage;
    let page:any;
    let context:any;
   

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
    });
    test.beforeEach(async () => {
        loginPage = new LoginPage(page);
        openAccountPage = new OpenAccountPage(page);
               
    });

    test("Login and Open a New Savings Account", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(userDataJson);
        await loginPage.validateLoginSuccess();
       

        await openAccountPage.navigateToOpenAccount();
        await openAccountPage.openSavingsAccount();
        
        await openAccountPage.validateAccountOpened();
        await openAccountPage.capturedSavingsAccount();
        
    });


      test.afterAll(async () => {
         await page.close();
         await context.close();
      });
});
