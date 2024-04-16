import {test, expect, APIResponse} from "@playwright/test"
import { allure } from "allure-playwright"
import { IPetsRequest, IPetsResponse } from "../interfaces/ipets"
import { DataPet } from "../data-for-api/pets"
import { EndpointPet as pointPet } from "../data-for-api/endpoints/endpoint-pet"
import { validatePetSchema } from "../data-for-api/schemes/schema-pet"
import  Ajv, {JSONSchemaType } from "ajv"
test.describe(`Проверка post запроса на ${pointPet.endpoint}`, async()=>{
  const baseUrl = 'https://petstore.swagger.io/v2'
  let petId: number;
  let response:APIResponse;
  let reqJson:IPetsResponse;
  let requestData:IPetsRequest;

  test.beforeAll('Получение данных response create pet', async ({request})=>{
    requestData = DataPet.dataForCreatePet
    response = await request.post(`${baseUrl}${pointPet.endpoint}`, {
      headers: requestData.headers,
      data: requestData.data 
    })
    expect(response.ok(), `status в диапазоне 200-299 ответов`).toBeTruthy();
    reqJson = await response.json();
    petId = reqJson.id; 
  })
  test('Проверка заголовков ответа access-control-allow-origin', async()=>{
    allure.step(`Заголовок access-control-allow-origin равен *`, async()=>{
      expect(response.headers()['access-control-allow-origin']).toBe('*')
    })
      
  })
  test('Проверка заголовков ответа content-type', async()=>{
    allure.step(`content-type ответа равен application/json`, async()=>{
      expect(response.headers()['content-type']).toBe('application/json');
    })
  })
  test('Проверка созданных данных id', async()=>{
    allure.step('Значение id ответа больше 0', async()=>{
      expect(reqJson.id > 0).toBeTruthy();
    })
    
  })
  test('Проверка созданных данных ', async()=>{
    allure.step('Статус отправленных данных и ответа совпадают', async()=>{
      expect(reqJson.status).toBe(requestData.data.status)
    })
  })
  test('Проверка schema', async ()=>{
    allure.step('Схема ответа соответствует ожидаемой', async()=>{
      const conditionSchema = validatePetSchema(reqJson)
      expect(conditionSchema, `Json ответа ${JSON.stringify(reqJson)}`).toBeTruthy();
    })
  })
})
