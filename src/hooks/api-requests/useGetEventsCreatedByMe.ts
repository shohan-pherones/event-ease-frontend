import { API_BASE_URL } from "@/constants";
import { IEventsResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const useGetEventsCreatedByMe = () => {
  const getEventsCreatedByMeRequestHandler =
    async (): Promise<IEventsResponse> => {
      const res = await axiosInstance.get(`${API_BASE_URL}/events`);
      return res.data;
    };

  const { data, isLoading, error } = useQuery<IEventsResponse, Error>(
    "fetchEventsCreatedByMe",
    getEventsCreatedByMeRequestHandler
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
