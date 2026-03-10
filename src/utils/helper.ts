import { DATE_FORMAT } from "../consts/date.const";
import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const formatDate = (
  date: Date,
  format: string = DATE_FORMAT.DDMMYYYY,
) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  switch (format) {
    case DATE_FORMAT.DDMMYYYY:
      return `${day}-${month}-${year}`;
    case DATE_FORMAT.MMDDYYYY:
      return `${month}-${day}-${year}`;
    case DATE_FORMAT.YYYYMMDD:
      return `${year}-${month}-${day}`;
    default:
      return `${year}-${month}-${day}`;
  }
};

export const formatCurrency = (amount: number) => {
  return amount
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace(/\./g, ",")
    .replace(/\s₫/, " đ");
};

export const formatDateISO = (date: Date) => {
  return date.toISOString();
};

// export const moneyFormat = (money: number) => {
//   return money.toLocaleString("vi-VN", { style: "currency", currency: "VND" }).replace(/\./g, ",");
// };

export const moneyFormat = (amount: number | undefined) => {
  if (amount === undefined || amount === null) {
    console.warn("moneyFormat received an undefined or null amount");
    return "N/A"; // Return a default value or handle it as needed
  }
  return amount
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace(/\./g, ",");
};

export const formatParamsString = (params: Record<string, any>) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
};

export const isEmptyObject = (obj: any): boolean => {
  return !Object.keys(obj).length;
};

export const formatResponse = <T>(data: T, success: boolean = true) => {
  return {
    success,
    data,
  };
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const phonePatterns: {
    [key: string]: {
      pattern: RegExp;
      code: string;
      country: string;
    };
  } = {
    VN: {
      pattern: /^(0|84|\+84)?[-.\s]?(\d{2,3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
      code: "+84",
      country: "VN",
    },
    US: {
      pattern: /^(\+?1)?[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
      code: "+1",
      country: "US",
    },
  };

  const cleanPhone = phoneNumber.replace(/[-.\s]/g, "");

  for (const country in phonePatterns) {
    const { pattern, code } = phonePatterns[country];
    const match = cleanPhone.match(pattern);
    if (match) {
      const formattedNumber =
        country === "VN"
          ? `(${match[2]})-${match[3]}-${match[4]}`
          : `(${match[2]}) ${match[3]}-${match[4]}`;

      return `${code} ${formattedNumber}`;
    }
  }

  return phoneNumber;
};

export const notification = (message: string) => {
  return toast(message, {
    type: "success",
  });
};

/** Màu toast theo design system (rosewood, brown, v.v.) */
const TOAST_COLORS = {
  success: "#A0613D", // rosewood-deep, dễ đọc trên nền sáng
  error: "#B91C1C",
  info: "#7A5C52", // brown-mid
  warning: "#B45309",
};

export const notificationMessage = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "success",
) => {
  const options = {
    position: "top-right" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored" as const,
    style: {
      backgroundColor: TOAST_COLORS[type],
      color: "#F8EDEB",
    },
  };

  return type === "success"
    ? toast.success(message, options as ToastOptions<unknown>)
    : type === "error"
      ? toast.error(message, options as ToastOptions<unknown>)
      : type === "info"
        ? toast.info(message, options as ToastOptions<unknown>)
        : toast.warning(message, options as ToastOptions<unknown>);
};

export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
};
