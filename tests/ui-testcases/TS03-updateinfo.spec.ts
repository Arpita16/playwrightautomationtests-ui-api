import { test} from '@playwright/test';
import { LoginPage } from '../../pages/loginpage';
import { RegistrationPage } from '../../pages/registrationpage';
import userDataJson from "../../utils/userData.json"

import { UpdateContactInfoPage } from '../../pages/updatecontactinfo';

test.describe('User login and Profile Update', () => {
    let page: any;
    let context:any;
    let loginPage:LoginPage;
    let updateContactInfoPage: UpdateContactInfoPage;
    let registration:RegistrationPage

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        
        loginPage = new LoginPage(page);
        updateContactInfoPage = new UpdateContactInfoPage(page);
        registration=new RegistrationPage(page);
    });

    test('User can login and update contact info', async () => {
       
        await loginPage.navigateToLoginPage();

    
        await loginPage.login(userDataJson);

   
        await updateContactInfoPage.gotoUpdateProfile();    
        await updateContactInfoPage.updateContactInfo('77777-7777');
        await updateContactInfoPage.clickUpdateProfile();
        await updateContactInfoPage.validateUpdateSuccess();
        await registration.logout();
      
    });

    test.afterAll(async () => {
       
        await page.close();
        await context.close();
    });
});
