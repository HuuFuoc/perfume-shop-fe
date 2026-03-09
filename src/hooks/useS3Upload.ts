import { useState } from "react";
import { uploadFileToS3, deleteFileFromS3 } from "../utils/upload";
import type { UploadedS3File } from "../utils/upload";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

type UseS3UploadReturn = {
  selectedFile: File | null;
  previewUrl: string;
  uploadedImage: UploadedS3File | null;
  isUploading: boolean;
  uploadError: string;
  handleSelectFile: (file: File | null) => void;
  handleUpload: () => Promise<UploadedS3File | null>;
  handleDelete: () => Promise<void>;
  reset: () => void;
};

export const useS3Upload = (): UseS3UploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<UploadedS3File | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleSelectFile = (file: File | null) => {
    setUploadError("");

    if (!file) {
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng chọn file ảnh.");
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setUploadError("Ảnh phải nhỏ hơn 5MB.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async (): Promise<UploadedS3File | null> => {
    if (!selectedFile) {
      setUploadError("Bạn chưa chọn ảnh.");
      return null;
    }

    try {
      setIsUploading(true);
      setUploadError("");
      const result = await uploadFileToS3(selectedFile);
      setUploadedImage(result);
      return result;
    } catch {
      setUploadError(
        "Upload thất bại. Kiểm tra lại Cognito, IAM policy và CORS.",
      );
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!uploadedImage) return;

    try {
      setIsUploading(true);
      setUploadError("");
      await deleteFileFromS3(uploadedImage.key);
      setUploadedImage(null);
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    } catch {
      setUploadError("Xóa ảnh thất bại.");
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setUploadedImage(null);
    setIsUploading(false);
    setUploadError("");
  };

  return {
    selectedFile,
    previewUrl,
    uploadedImage,
    isUploading,
    uploadError,
    handleSelectFile,
    handleUpload,
    handleDelete,
    reset,
  };
};
