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

  async function createUser(userData: { name: string; job: string }) {
    const response = await apiContext.post('/api/users', { data: userData });
    return response;
  }
  

  test('POST create a new user', async () => {
    const newUser = { name: 'John Doe', job: 'Developer' };
    const response = await createUser(newUser);

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.name).toBe(newUser.name);
    expect(body.job).toBe(newUser.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

});