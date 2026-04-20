import toast from "react-hot-toast";
import { ApiResponse } from "@/app/[locale]/_types/Api";

const isAxiosApiError = (
  error: unknown,
): error is { response: { data: ApiResponse<unknown> } } =>
  typeof error === "object" &&
  error !== null &&
  "response" in error &&
  typeof (error as { response?: unknown }).response === "object" &&
  (error as { response: { data?: unknown } }).response !== null &&
  "data" in (error as { response: { data?: unknown } }).response &&
  typeof (error as { response: { data: { message?: unknown } } }).response.data
    .message === "string";

export const toastError = (error: unknown): void => {
  if (isAxiosApiError(error)) {
    toast.error(error.response.data.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("حدث خطأ غير متوقع");
  }
};
