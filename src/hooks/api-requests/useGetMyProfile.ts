import { API_BASE_URL } from "@/constants";
import { IUserResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const useGetMyProfile = (userId?: string) => {
  const getMyProfileRequestHandler = async (): Promise<IUserResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/users/${userId}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IUserResponse, Error>(
    "fetchMyProfile",
    getMyProfileRequestHandler,
    { enabled: !!userId }
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
