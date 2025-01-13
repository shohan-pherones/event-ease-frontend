import { API_BASE_URL } from "@/constants";
import { IEventResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const useGetEventDetails = (eventId?: string) => {
  const getEventDetailsRequestHandler = async (): Promise<IEventResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/events/${eventId}`);
    return res.data;
  };

  const { data, isLoading, error, refetch } = useQuery<IEventResponse, Error>(
    "fetchEventDetails",
    getEventDetailsRequestHandler,
    { enabled: !!eventId }
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error, refetch };
};
