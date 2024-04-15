import {statusPets} from '../../interfaces/ipets'
export class EndpointPet {
  static endpoint = '/pet'
  static post = {
    uploadImage: function(petId:number):string{
      return `${this.endpoint}/${petId}/uploadImage`
    },
    createPet: this.endpoint,
    updatePetWithFormData: function(petId:number):string{
      return `${this.endpoint}/${petId}`
    }
  }
  static put = {
    updateExistingPet: this.endpoint
  }
  static get = {
    findByStatus: function(status:statusPets):string{
      return `${this.endpoint}/findByStatus`
    },
    getById: function(petId:number):string{
      return `${this.endpoint}/${petId}`
    }
  }
}