export interface BrandRes {
  _id: string;
  brandName: string;
  description?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAllBrandsRes {
  message: string;
  data: BrandRes[];
}

export interface GetBrandByIdRes {
  message: string;
  data: BrandRes;
}

export interface CreateBrandRes {
  message: string;
}

export interface UpdateBrandRes {
  message: string;
  data: BrandRes;
}

export interface DeleteBrandRes {
  message: string;
}
