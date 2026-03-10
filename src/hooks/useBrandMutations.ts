import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BrandService } from "../services/brand/brand.services";
import { notificationMessage } from "../utils/helper";

export const BRANDS_QUERY_KEY = ["admin-brands"] as const;

export function useCreateBrand(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandName: string) => BrandService.createBrand({ brandName }),
    onSuccess: async () => {
      notificationMessage("Thêm brand thành công!", "success");
      await queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY });
      onSuccess?.();
    },
    onError: () => {
      notificationMessage("Thêm brand thất bại. Vui lòng thử lại.", "error");
    },
  });
}

export function useUpdateBrand(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, brandName }: { id: string; brandName: string }) =>
      BrandService.updateBrand({ id, brandName }),
    onSuccess: async () => {
      notificationMessage("Cập nhật brand thành công!", "success");
      await queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY });
      onSuccess?.();
    },
    onError: () => {
      notificationMessage(
        "Cập nhật brand thất bại. Vui lòng thử lại.",
        "error",
      );
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BrandService.deleteBrand({ id }),
    onSuccess: async () => {
      notificationMessage("Xóa brand thành công!", "success");
      await queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY });
    },
    onError: () => {
      notificationMessage("Xóa brand thất bại. Vui lòng thử lại.", "error");
    },
  });
}
