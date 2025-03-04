import { test } from "@playwright/test";
import { RegistrationPage } from "../../pages/registrationpage";


import userDataJson from "../../utils/userData.json"

let page: any;
let context:any;
let registrationPage: RegistrationPage;


test.describe("Registration Page", () => {

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    registrationPage = new RegistrationPage(page);
    });
    
  
  
     test.beforeEach(async () => {
     await page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
     });

test('should register a new user', async () => {
         await registrationPage.goto();
         
         
         await registrationPage.fillRegisterForm(userDataJson);
        
         await registrationPage.submitForm();

       
     
         await registrationPage.validateRegistrationSuccess();
       

        await registrationPage.logout();
         
       });

       test.afterAll(async () => {
        await page.close();
        await context.close();
      });
     });

