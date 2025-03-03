import { test,expect,request} from "@playwright/test";
import {APIRequestContext, APIResponse } from "@playwright/test";

let apiContext: APIRequestContext;


test.describe('Page User data with User ID API- Comprehensive Validations', () => {

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
          baseURL: 'https://reqres.in/',
        })
    console.log(' API context initialized');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
    console.log(' API context disposed');
  })
  test.beforeEach(async () => {
    console.log('Starting a new test...');
  });

  test.afterEach(async () => {
    console.log('Test completed.');
  });



//Validate that data from api/users
async  function fetchUserList() {
    const response = await apiContext.get(`api/users`);
    expect(response.status()).toBe(200);
    return await response.json();
}
//Validate that data from api/users/{id}
async function fetchUserById(Id: number) {
    const response = await apiContext.get(`/api/users/${Id}`);
    expect(response.status()).toBe(200);
    return await response.json();
}

test('Validate user data between lists and single user API', async () => {  
    
    const listData = await  fetchUserList();
    

    const selectedUser = listData.data[0];

    const userData = await fetchUserById(selectedUser.id);

    //Verify user details matches with selected user details
    expect(userData.data).toEqual(selectedUser);
    expect(userData.data.id).toBe(selectedUser.id);
    expect(userData.data.email).toBe(selectedUser.email);
    expect(userData.data.first_name).toBe(selectedUser.first_name);
    expect(userData.data.last_name).toBe(selectedUser.last_name);
    expect(userData.data.avatar).toBe(selectedUser.avatar);

    
});
});

/*Try to think any possible way of completing this task in a not correct way. 

Scenario 1-First fetch the list of users but then attempt to retrieve the details of a specific 
            user before ensuring that the first request has completed.This could lead to issues 
            where the second request fails because it tries to access the data that has not been retrieved.

Scenario 2-Another incorrect approach would be to hardcore user Ids or using user Id which doesnot exist.
           If the user doesnot exist,the second request could fail with incorrect results.*/           

