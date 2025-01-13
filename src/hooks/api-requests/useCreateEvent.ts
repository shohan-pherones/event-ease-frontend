import { API_BASE_URL } from "@/constants";
import { IEvent, IEventResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "react-query";

export const useCreateEvent = () => {
  const createEventRequestHandler = async (
    eventData: IEvent
  ): Promise<IEventResponse> => {
    const res = await axiosInstance.post(`${API_BASE_URL}/events`, {
      ...eventData,
      maxAttendees: String(eventData.maxAttendees),
    });
    return res.data;
  };

  return useMutation<IEventResponse, Error, IEvent>(createEventRequestHandler);
};
