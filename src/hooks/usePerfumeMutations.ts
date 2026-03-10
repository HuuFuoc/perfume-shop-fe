import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PerfumeService } from "../services/perfume/perfume.services";
import { notificationMessage } from "../utils/helper";
import type {
  CreatePerfumeReq,
  UpdatePerfumeReq,
} from "../types/perfume/Perfume.req.type";

export const PERFUMES_QUERY_KEY = ["admin-perfumes"] as const;

export function useCreatePerfume(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePerfumeReq) =>
      PerfumeService.createPerfume(payload),
    onSuccess: async () => {
      notificationMessage("Thêm nước hoa thành công!", "success");
      await queryClient.invalidateQueries({ queryKey: PERFUMES_QUERY_KEY });
      onSuccess?.();
    },
    onError: () => {
      notificationMessage("Thêm nước hoa thất bại. Vui lòng thử lại.", "error");
    },
  });
}

export function useUpdatePerfume(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePerfumeReq) =>
      PerfumeService.updatePerfume(payload),
    onSuccess: async () => {
      notificationMessage("Cập nhật nước hoa thành công!", "success");
      await queryClient.invalidateQueries({ queryKey: PERFUMES_QUERY_KEY });
      onSuccess?.();
    },
    onError: () => {
      notificationMessage(
        "Cập nhật nước hoa thất bại. Vui lòng thử lại.",
        "error",
      );
    },
  });
}

export function useDeletePerfume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PerfumeService.deletePerfume({ id }),
    onSuccess: async () => {
      notificationMessage("Xóa nước hoa thành công!", "success");
      await queryClient.invalidateQueries({ queryKey: PERFUMES_QUERY_KEY });
    },
    onError: () => {
      notificationMessage("Xóa nước hoa thất bại. Vui lòng thử lại.", "error");
    },
  });
}
