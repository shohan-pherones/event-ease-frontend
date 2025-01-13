import { API_BASE_URL } from "@/constants";
import { IEvent, IEventResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "react-query";

export const useUpdateEvent = (eventId?: string) => {
  const updateEventRequestHandler = async (
    eventData: IEvent
  ): Promise<IEventResponse> => {
    const res = await axiosInstance.put(`${API_BASE_URL}/events/${eventId}`, {
      ...eventData,
      maxAttendees: String(eventData.maxAttendees),
    });
    return res.data;
  };

  return useMutation<IEventResponse, Error, IEvent>(updateEventRequestHandler);
};
