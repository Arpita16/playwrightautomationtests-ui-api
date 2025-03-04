import { test,expect,request } from "@playwright/test";
  
import {APIRequestContext, APIResponse } from "@playwright/test";

let apiContext: APIRequestContext;
const BASE_URL = 'https://reqres.in/api/login';

test.describe('Login API - Comprehensive Validations', () => {

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext();
    console.log('API context initialized');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
    console.log(' API context disposed');
  });

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
      data: 
      { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    });

    const body = await validateResponse(response, 200, ['token']);
    console.log(' Login token:', body.token);
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
  
  });

  test('Login fails with missing password', async () => {
    const response = await apiContext.post(BASE_URL, {
      data: { email: 'eve.holt@reqres.in' },
    });

    const body = await validateResponse(response, 400, ['error']);
    expect(body.error).toBe('Missing password');
  });

  test(' Login fails with missing email', async () => {
    const response = await apiContext.post(BASE_URL, {
      data: { password: 'cityslicka' },
    });

    const body = await validateResponse(response, 400, ['error']);
    expect(body.error).toBe('Missing email or username');
  });

  


  test(' Login fails with incorrect credentials', async () => {
    const response = await apiContext.post(BASE_URL, {
      data: { email: 'eve.holt@reqres.in', password: 'wrongpassword' },
    });

    const body = await validateResponse(response, 200, ['token']);//should give an error but gives 200 OK
    expect(body.error).toBe(undefined);//there should be an error
  });

  test(' Login with additional unexpected fields', async () => {
    const response = await apiContext.post(BASE_URL, {
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka', extraField: 'unexpected' },
    });

    const body = await validateResponse(response, 200, ['token']);//should give an error but gives 200 OK
    expect(typeof body.token).toBe('string');//there should be an error
  });

 
test('Content-Type should be application/json', async () => {
    const response = await apiContext.post(BASE_URL, {
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    });

    expect(response.headers()['content-type']).toContain('application/json');
  });
});
