type statusPets = 'available'| 'pending'| 'sold';

export interface IPetsRequest {
  headers: {
    [key:string]: string
  },
  data : {
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
}

export interface IPetsResponse {
  id: number,
  category: {
      id: number,
      name: string
  },
  name: string,
  photoUrls: [
      string
  ],
  tags: [
      {
          id: number,
          name: string
      }
  ],
  status: statusPets
}