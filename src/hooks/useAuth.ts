import { IAuthResponse } from "@/interfaces";
import { logout, saveCredentials } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const { message, accessToken, refreshToken, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const saveCredentialsDispatcher = (payload: IAuthResponse) => {
    dispatch(saveCredentials(payload));
  };

  const logoutDispatcher = () => {
    dispatch(logout());
  };

  return {
    message,
    accessToken,
    refreshToken,
    user,
    saveCredentialsDispatcher,
    logoutDispatcher,
  };
};

export default useAuth;
