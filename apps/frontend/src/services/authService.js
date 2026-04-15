//Auth Services - Functions that call api functions
import apiClient from "../api/apiClient";

const BASE_PATH = "/auth";

const AUTH_ENDPOINTS = {
  login: `${BASE_PATH}/login`,
  register: `${BASE_PATH}/register`,
};

const loginService = async (payload) => {
  //call api function here
  const response = await apiClient.post(AUTH_ENDPOINTS.login, payload);
  return response.data;
};

const registerService = async (payload) => {
  const response = await apiClient.post(AUTH_ENDPOINTS.register, payload);
  return response.data;
};

export { loginService, registerService };
