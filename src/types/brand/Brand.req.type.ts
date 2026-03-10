export interface CreateBrandReq {
  brandName: string;
}

export interface UpdateBrandReq {
  id: string;
  brandName: string;
}

export interface GetBrandByIdReq {
  id: string;
}

export interface DeleteBrandReq {
  id: string;
}
