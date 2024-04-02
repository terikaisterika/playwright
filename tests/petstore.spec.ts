import {test, expect} from "@playwright/test"
import { allure } from "allure-playwright"
const baseUrl = 'https://petstore.swagger.io/v2'

test('create pet', async ({request})=>{
  
    const data = {
      id: 0,
      category:{
        id: 1,
        name: 'dogs'
      },
      name: 'Bobbi',
      photoUrls:["/testdog.jpg"],
      tags: [{
        id: 1,
        name: "spaniel"
    }],
    status: "available"
  }
  const newIssue = await request.post(`${baseUrl}/pet`, {
    headers: {'Accept': 'application/json'},
    data: data
  })
  expect(newIssue.ok()).toBeTruthy();
  expect(newIssue.headers()['content-type']).toBe('application/json');
  const reqJson = await newIssue.json();
  expect(reqJson.id > 0).toBeTruthy();
  
})