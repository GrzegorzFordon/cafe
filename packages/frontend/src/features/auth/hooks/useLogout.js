import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";

const useLogout = () => {
  const navigate = useNavigate();
  const reset = useAuthStore((state) => state.reset);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      try {
        reset();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {},
  });

  return { logout: mutate, isPending, isError, error };
};

export default useLogout;
