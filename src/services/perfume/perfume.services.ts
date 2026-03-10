import { BaseService } from "../../app/api/base.service";
import { API_PATH } from "../../consts/api.path.const";
import type {
  GetAllPerfumesReq,
  CreatePerfumeReq,
  UpdatePerfumeReq,
  GetPerfumeByIdReq,
  DeletePerfumeReq,
  CreateCommentReq,
} from "../../types/perfume/Perfume.req.type";
import type {
  GetAllPerfumesRes,
  GetPerfumeByIdRes,
  CreatePerfumeRes,
  UpdatePerfumeRes,
  DeletePerfumeRes,
  CreateCommentRes,
} from "../../types/perfume/Perfume.res.type";

export const PerfumeService = {
  getAllPerfumes(params?: GetAllPerfumesReq) {
    return BaseService.get<GetAllPerfumesRes>({
      url: API_PATH.PERFUME.BASE,
      payload: params,
    });
  },

  getPerfumeById({ id }: GetPerfumeByIdReq) {
    return BaseService.get<GetPerfumeByIdRes>({
      url: `${API_PATH.PERFUME.BASE}/${id}`,
    });
  },

  createPerfume(payload: CreatePerfumeReq) {
    return BaseService.post<CreatePerfumeRes>({
      url: API_PATH.PERFUME.BASE,
      payload,
    });
  },

  updatePerfume({ id, ...payload }: UpdatePerfumeReq) {
    return BaseService.put<UpdatePerfumeRes>({
      url: `${API_PATH.PERFUME.BASE}/${id}`,
      payload,
    });
  },

  deletePerfume({ id }: DeletePerfumeReq) {
    return BaseService.remove<DeletePerfumeRes>({
      url: `${API_PATH.PERFUME.BASE}/${id}`,
    });
  },

  createComment({ id, content, rating }: CreateCommentReq) {
    return BaseService.post<CreateCommentRes>({
      url: `${API_PATH.PERFUME.BASE}/${id}/comments`,
      payload: { content, rating },
    });
  },
};
