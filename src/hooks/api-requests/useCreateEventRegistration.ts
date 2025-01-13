import { API_BASE_URL } from "@/constants";
import { IEventRegistrationResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "react-query";

export const useCreateEventRegistration = () => {
  const createEventRegistrationRequestHandler = async (
    eventId: string
  ): Promise<IEventRegistrationResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/event-registrations/create/${eventId}`
    );
    return res.data;
  };

  return useMutation<IEventRegistrationResponse, Error, string>(
    createEventRegistrationRequestHandler
  );
};
