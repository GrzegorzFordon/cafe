//custom hook for login logic
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import {loginService} from "../services/authService.js";

const useLogin = () => {
  const navigate = useNavigate();
  //also get store setting
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  //React Query Mutation goes here
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (payload) => {
      try {
        //mutation call the service
        const result = await loginService(payload);
        //this call also sets the zustand state
        console.log(result);
        setAccessToken(result);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {},
  });

  return { login: mutate, isPending, isError, error };
};

export default useLogin;
