import {  test} from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';
import userData from "../../utils/userData.json"
import { AccountsOverviewPage } from '../../pages/accountsoverview';



test.describe('User Login', () => {
    let page: any;
    let context:any;
    let loginPage: LoginPage;
    let accountOverviewPage:AccountsOverviewPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        accountOverviewPage =new AccountsOverviewPage(page);
    });

    test('User can login', async () => {
          
        await loginPage.navigateToLoginPage();
        await loginPage.login(userData);
        await loginPage.validateLoginSuccess();
        await accountOverviewPage.navigateToAccountsOverview();
        await loginPage.captureCheckingAccountNumber();
    });

       
         

    
        test.afterAll(async () => {
        await page.close();
        await context.close();
        
        
        });
    });