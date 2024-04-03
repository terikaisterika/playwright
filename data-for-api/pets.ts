import { IPetsRequestBody } from "../interfaces/ipets";

export class DataPet{
  static dataForCreatePet: IPetsRequestBody = {
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
}