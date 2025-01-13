import { API_BASE_URL } from "@/constants";
import { IMessageResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "react-query";

export const useRevokeEventRegistration = () => {
  const revokeEventRegistrationRequestHandler = async (
    eventId: string
  ): Promise<IMessageResponse> => {
    const res = await axiosInstance.put(
      `${API_BASE_URL}/event-registrations/revoke/${eventId}`
    );
    return res.data;
  };

  return useMutation<IMessageResponse, Error, string>(
    revokeEventRegistrationRequestHandler
  );
};
