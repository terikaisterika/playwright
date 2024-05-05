import {test as base} from '@playwright/test'
import { IPetsRequest } from "../interfaces/ipets";
export class DataPet{
  
  static dataForCreatePet: IPetsRequest = {
    headers: {
      'Accept': 'application/json'
    },
    data: {
      id: 1,
      category:{
      id: 1,
      name: 'dogs'
    },
    name: 'Bobbi',
    photoUrls:['/testdog.jpg'],
    tags: [{
      id: 1,
      name: "spaniel"
  }],
  status: "available"
    }
}
}
type forWorkWithPets = {
  pet: {
    dataForCreatePet:IPetsRequest
  }
}
export const test = base.extend<forWorkWithPets>({
  pet: async ({}, use)=>{
    await use(DataPet)
  }
});

export const expect = base.expect;
