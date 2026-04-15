import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools((set) => ({
    accessToken: undefined,
    accessTokenData: undefined,

    setAccessToken: (token) => {
      const decode = token ? jwtDecode(token.accessToken) : undefined;
      const accessTokenData = { username: decode.username, id: decode.id };
      set({ accessToken: token.accessToken, accessTokenData });
    },

    reset: () => {
      set({ accessToken: undefined, accessTokenData: undefined });
    },
  })),
);

export default useAuthStore;
