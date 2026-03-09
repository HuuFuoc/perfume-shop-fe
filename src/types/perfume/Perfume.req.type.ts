export interface getAllPerfumeReq {
  pageSize?: string;
  pageNumber?: string;
}

export interface CreatePerfumeReq {
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string;
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string;
  brand: string;
}

export interface GetPerfumeByIdReq {
  id: string;
}
