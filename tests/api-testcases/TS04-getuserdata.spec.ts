import { test, expect, request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.describe('ReqRes POST API Tests', () => {
  test.beforeAll(async () => {
    // Initialize API context before all tests
    apiContext = await request.newContext({
      baseURL: 'https://reqres.in/',
    });
  });

  test.afterAll(async () => {
    // Dispose API context after all tests
    await apiContext.dispose();
  });

  test.beforeEach(async () => {
    console.log('Starting a new test...');
  });

  test.afterEach(async () => {
    console.log('Test completed.');
  });

  async function getUsers(page: number) {
  
    const response = await apiContext.get(`/api/users?page=${page}`);
    console.log(response.url())
    return response;
  }
  

  test('GET users list', async () => {
    const response = await getUsers(2);
    console.log(response.status())
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log(body)

    const userCount = body.data.length;
    console.log(`Total users on page 2: ${userCount}`);

    expect(userCount).toBe(6)
    expect(body.page).toBe(2);
    expect(body.per_page).toBe(6)
    expect(body.total).toBe(12)
    expect(body.total_pages).toBe(2)
    expect(body.data).toBeInstanceOf(Array);
  });

  
      
 test("Page user data unique", async () => {
    const response = await getUsers(2);
    const resp=await getUsers(1)

    expect(response).not.toBe(resp)
  
});
});