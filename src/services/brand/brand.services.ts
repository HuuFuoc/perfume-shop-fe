import { BaseService } from "../../app/api/base.service";
import { API_PATH } from "../../consts/api.path.const";
import type {
  CreateBrandReq,
  UpdateBrandReq,
  GetBrandByIdReq,
  DeleteBrandReq,
} from "../../types/brand/Brand.req.type";
import type {
  GetAllBrandsRes,
  GetBrandByIdRes,
  CreateBrandRes,
  UpdateBrandRes,
  DeleteBrandRes,
} from "../../types/brand/Brand.res.type";

export const BrandService = {
  getAllBrands() {
    return BaseService.get<GetAllBrandsRes>({
      url: API_PATH.BRAND.BASE,
    });
  },

  getBrandById({ id }: GetBrandByIdReq) {
    return BaseService.get<GetBrandByIdRes>({
      url: `${API_PATH.BRAND.BASE}/${id}`,
    });
  },

  createBrand({ brandName }: CreateBrandReq) {
    return BaseService.post<CreateBrandRes>({
      url: API_PATH.BRAND.BASE,
      payload: { brandName },
    });
  },

  updateBrand({ id, brandName }: UpdateBrandReq) {
    return BaseService.put<UpdateBrandRes>({
      url: `${API_PATH.BRAND.BASE}/${id}`,
      payload: { brandName },
    });
  },

  deleteBrand({ id }: DeleteBrandReq) {
    return BaseService.remove<DeleteBrandRes>({
      url: `${API_PATH.BRAND.BASE}/${id}`,
    });
  },
};
