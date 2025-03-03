import {  test} from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';
import userDataJson from "../../utils/userData.json"
import { AccountsOverviewPage } from '../../pages/accountsoverview';



test.describe('User Login', () => {
    let page: any;
    let loginPage: LoginPage;
    let accountOverviewPage:AccountsOverviewPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        accountOverviewPage =new AccountsOverviewPage(page);
    });

    test('User can login', async () => {
          
        await loginPage.navigateToLoginPage();
        await loginPage.login(userDataJson);
        await loginPage.validateLoginSuccess();
        await accountOverviewPage.navigateToAccountsOverview();
        await loginPage.captureCheckingAccountNumber();
    });

       
         

    
        test.afterAll(async () => {
        await page.close();
        });
    });