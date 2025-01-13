import { API_BASE_URL } from "@/constants";
import { IAuthResponse, ILogin } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "react-query";

export const useLogin = () => {
  const createLoginRequestHandler = async (
    loginData: ILogin
  ): Promise<IAuthResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/users/auth/login`,
      loginData
    );
    return res.data;
  };

  return useMutation<IAuthResponse, Error, ILogin>(createLoginRequestHandler);
};
