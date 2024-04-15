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
    photoUrls:["/testdog.jpg"],
    tags: [{
      id: 1,
      name: "spaniel"
  }],
  status: "available"
    }
}
  
}