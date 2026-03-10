export interface GetAllPerfumesReq {
  pageSize?: string;
  pageNumber?: string;
  /** Tìm theo tên nước hoa (partial match, không phân biệt hoa thường) */
  search?: string;
  /** MongoId của brand để lọc */
  brand?: string;
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

export interface UpdatePerfumeReq extends CreatePerfumeReq {
  id: string;
}

export interface GetPerfumeByIdReq {
  id: string;
}

export interface DeletePerfumeReq {
  id: string;
}

export interface CreateCommentReq {
  id: string;
  content: string;
  rating: number;
}
