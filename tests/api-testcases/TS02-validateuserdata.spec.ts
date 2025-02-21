import { test,request, expect} from '@playwright/test';
import {APIRequestContext, APIResponse } from "@playwright/test";

let apiContext: APIRequestContext;
const BASE_URL = 'https://reqres.in/api/users/2';

test.describe('User Details - Comprehensive Validations', () => {

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext();
    console.log('✅ API context initialized');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
    console.log('🧹 API context disposed');
  });
  

/**
 * Validates the basic response properties like status code and content type.
 */
const validateBasicResponse = async (response: APIResponse) => {
  expect(response.status(), 'Status code should be 200').toBe(200);
  expect(response.headers()['content-type'], 'Content-Type should be application/json').toContain('application/json');
  console.log("Done response validation")
};

/**
 * Validates the user data object.
 */
const validateUserData = (data: any) => {
  expect(data, 'User data should exist').toBeDefined();
  expect(data.id, 'ID should be 2').toBe(2);
  expect(data.email, 'Email should be janet.weaver@reqres.in').toBe('janet.weaver@reqres.in');
  expect(typeof data.first_name, 'First name should be a string').toBe('string');
  expect(typeof data.last_name, 'Last name should be a string').toBe('string');
  expect(data.avatar, 'Avatar should be a valid URL').toMatch(/^https?:\/\/.+/);
  console.log("Done user data validation")
};

test("GET/Verify details of a specific user", async ({ request }) => {
    const response = await apiContext.get(BASE_URL);
    const body = await response.json();
    console.log(body)
    const resp=await validateBasicResponse(response);
    const userData=validateUserData(body.data);

});
});



