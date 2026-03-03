import { BaseService } from "../../app/api/base.service";
import type { ResponseSuccess } from "../../app/interface";
import { API_PATH } from "../../consts/api.path.const";
import type { getAllPerfumeReq } from "../../types/perfume/Perfume.req.type";

import type { getAllPerfumeRes } from "../../types/perfume/Perfume.res.type";
export const PerfumeService = {
  getAllPerfumes(params: getAllPerfumeReq) {
    return BaseService.get<ResponseSuccess<getAllPerfumeRes[]>>({
      url: API_PATH.PERFUME.GET_ALL_PERFUMES,
      payload: params,
    });
  },
};
