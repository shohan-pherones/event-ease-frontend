import { API_BASE_URL } from "@/constants";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "react-query";

export const useDeleteEvent = () => {
  const deleteEventRequestHandler = async (eventId: string): Promise<void> => {
    await axiosInstance.delete(`${API_BASE_URL}/events/${eventId}`);
  };

  return useMutation<void, Error, string>(deleteEventRequestHandler);
};
