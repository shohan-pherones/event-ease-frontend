import { IUserResponse } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../../constants";
import useAuth from "../useAuth";

export const useGetMyProfile = () => {
  const { user } = useAuth();

  const getMyProfileRequestHandler = async (): Promise<IUserResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/users/${user?._id}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IUserResponse, Error>(
    "fetchMyProfile",
    getMyProfileRequestHandler
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
