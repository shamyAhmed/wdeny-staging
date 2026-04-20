import { useMutation, useQueryClient } from "@tanstack/react-query";
import safariaAxios from "@/lib/safariaAxios";
import apiRoutes from "@/lib/apiRoutes";
import { toastError } from "@/utils/toastError";
import { SAFARIA_ADDRESSES_KEY } from "./useGetSafariaAddresses";

export type CreateSafariaAddressPayload = {
  name: string;
  notes: string;
  map_location: {
    lat: string;
    lng: string;
    address_name: string;
  };
};

const useCreateSafariaAddress = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSafariaAddressPayload) =>
      safariaAxios.post(apiRoutes.safariaAddresses, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SAFARIA_ADDRESSES_KEY });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      toastError(error);
    },
  });
};

export default useCreateSafariaAddress;
