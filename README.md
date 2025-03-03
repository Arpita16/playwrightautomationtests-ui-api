# playwrightautomationtests-ui-api


## Playwright Testing Project with TypeScript using Page Object Model (POM)

### 📌 Overview

This repository contains an automated testing framework using Playwright with TypeScript, following the Page Object Model (POM) design pattern. It enables efficient test automation for web applications with better maintainability and scalability.
This repository contains API test cases written using Playwright and TypeScript. These tests validate REST API endpoints by sending requests and verifying responses.  


### 🛠️ Tech Stack

- Playwright 🕵️‍♂️ (End-to-end testing)

- TypeScript ⌨️ (Strongly typed JavaScript)

- Test Runner 🧪 (Test execution)

- Page Object Model (POM) 📄 (Design pattern for better test structure)

  📂 **Project Structure**

       📦 playwrightautomationtests-ui-api
            ┣ 📂 tests
            ┃ ┣ 📂 api-testcases
            ┃ ┣ ┣📜 TS01-reqreslogin.spec.ts
            ┃ ┣ ┣📜 TS02-validateuserdata.spec.ts
            ┃ ┣ ┣📜 TS03-reqrescreateuser.spec.ts
            ┃ ┣ ┣📜 TS04-getuserdata.spec.ts
            ┃ ┣ ┣📜 TS05-validateuserid.spec.ts
            ┃ ┣ ┣📜 TS06-validateuniquelistusers.spec.ts
            ┃ ┣ 📂 ui-testcases
            ┃ ┣ ┣📜 TS01-registration.spec.ts
            ┃ ┣ ┣📜 TS02-login.spec.ts
            ┃ ┣ ┣📜 TS03-updateinfo.spec.ts
            ┃ ┣ ┣📜 TS04-openaccount.spec.ts
            ┃ ┣ ┣📜 TS05-accountsoverview.spec.ts
            ┃ ┣ ┣📜 TS06-transferfunds.spec.ts
            ┃ ┣ ┣📜 TS07-accountsoverviewaftertransfer.spec.ts
            ┣ 📂 pages
            ┃ ┣ 📜 accountsoverview.ts
            ┃ ┣ 📜 loginpage.ts
            ┃ ┣ 📜 openaccount.ts
            ┃ ┣ 📜 registrationpage.ts
            ┃ ┣ 📜 transferfunds.ts
            ┃ ┣ 📜 updatecontactinfo.ts
            ┣ 📜 playwright.config.ts
            ┣ 📜 package.json


  ### 🚀 Installation & Setup

   **1.Clone the repository**
  
      git clone https://github.com/Arpita16/playwrightautomationtests-ui-api.git
      cd playwrightautomation-tests-ui-api

   **2.Install dependencies**

       npx playwright install  

   **3.Install Playwright browsers**

        npx playwright install

    **3.Verify Playwright Installtion**

         npx playwright doctor

  ### 📌  Page Object Model (POM) Implementation 
  The Page Object Model (POM) helps in organizing locators and actions for different pages.
  
  **Example** : pages/loginpage.ts

        export class LoginPage {

                       private usernameInput = `input[name='username']`;
                       private passwordInput = `input[name='password']`;

                       constructor(public page: Page){
                            this.page = page;
        
                        }
                       async navigateToLoginPage(){
                                    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC')
                           }

                  async login(userData:any) {
                      await this.page.fill(this.usernameInput,userData.Username);
                     await this.page.fill(this.passwordInput,userData.Password);

                     await this.page.getByRole('button',{name:"Log In"}).click();  
     
                           }
                 async validateLoginSuccess(){
              
                        const successMessage= await this.page.locator('#showOverview');
                        await expect(successMessage).toContainText('Accounts Overview');
                           }
           async capturedAccount(){
    
                    const checkingAccountID=await this.page.locator('td#accountId');
                   fs.writeFileSync('checking_accounts.json', JSON.stringify(checkingAccountID));
        
               }
          }

### 🧪 Writing Tests
  Tests are written using Playwright Test Runner.

 **Example**: tests/ui-testcases/login.spec.ts

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
                    await loginPage.capturedAccount();
                    });
  
             test.afterAll(async () => {
                  await page.close();
                 });
              });


### 📌  API Test Scripts
  **Example** :tests/api-testcases/reqreslogin.spec.ts

               const validateResponse = async (response: APIResponse, expectedStatus: number, expectedBodyKeys: string[] = []) => {
               expect(response.status()).toBe(expectedStatus);
               expect(response.headers()['content-type']).toContain('application/json');
               const body = await response.json();
              for (const key of expectedBodyKeys) {
                   expect(body).toHaveProperty(key);
                }
              return body;
             };

                test(' Successful login with valid credentials', async () => {
                         const response = await apiContext.post(BASE_URL, {
                         data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
                      });

              const body = await validateResponse(response, 200, ['token']);
              console.log(' Login token:', body.token);
              expect(body).toHaveProperty('token');
              expect(typeof body.token).toBe('string');
              });

### 🛠 Running Tests

- Run tests only in Chromium through CLI
              
               npx playwright test --project=chromium

- Run tests in headed mode (with UI)
      
               npx playwright test --headed

- Run tests with a specific file

         npx playwright test tests/ui-testcases/login.spec.ts


### 📊 Test Reporting

- The framework generates an HTML report in    playwright-report/.
   
- Run the following command to view reports:
    
               npx playwright show-report

### 🛡️ CI/CD Integration
  
  You can integrate Playwright with **GitHub Actions** by adding    .github/workflows/playwright.yml.

   Example CI/CD workflow:

           name: Playwright Tests
           on: [push, pull_request]
           jobs:
              test:
                 runs-on: ubuntu-latest
                 steps:
                      - name: Checkout Repository
                        uses: actions/checkout@v3
                      - name: Install Dependencies
                        run: npm install
                      - name: Install Playwright Browsers
                        run: npx playwright install
                      - name: Run Tests
                        run: npx playwright test

### 📌 Additional Playwright Commands

- Debug tests
  
        npx playwright test --debug

- Run tests in different browsers

         npx playwright test --browser=firefox














            
