import { API_BASE_URL } from "@/constants";
import { IAuthResponse, IRegistration } from "@/interfaces";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "react-query";

export const useRegistration = () => {
  const createRegistrationRequestHandler = async (
    registrationData: IRegistration
  ): Promise<IAuthResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/users/auth/register`,
      registrationData
    );
    return res.data;
  };

  return useMutation<IAuthResponse, Error, IRegistration>(
    createRegistrationRequestHandler
  );
};
