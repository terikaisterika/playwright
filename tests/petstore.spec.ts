import {test, expect} from "@playwright/test"
import { allure } from "allure-playwright"
import { IPetsRequestBody } from "../interfaces/ipets"
import { DataPet } from "../data-for-api/pets"
const baseUrl = 'https://petstore.swagger.io/v2'

test('create pet', async ({request})=>{
    const data:IPetsRequestBody = DataPet.dataForCreatePet
    const newIssue = await request.post(`${baseUrl}/pet`, {
    headers: {'Accept': 'application/json'},
    data: data
  })
  expect(newIssue.ok()).toBeTruthy();
  expect(newIssue.headers()['content-type']).toBe('application/json');
  const reqJson = await newIssue.json();
  expect(reqJson.id > 0).toBeTruthy();
  
})