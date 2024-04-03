type statusPets = 'available'| 'pending'| 'sold';

export interface IPetsRequestBody {
  id: number;
  category: {
    id: number;
    name: string,
  },
  name:string,
  photoUrls: string[],
  tags: {
    id: number,
    name: string
  }[],
  status: statusPets
}