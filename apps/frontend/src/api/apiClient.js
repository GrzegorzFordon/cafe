// AXIOS CLIENT INSTANCE
// set the base url and common things
// services will dictate what method and what endpoint they wanna use
import axios from "axios";
import process from "dotenv/config";
// const BACKEND_URL = "http://localhost:3500";

const apiClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//ADD INTERCEPTOR FOR ADDING ACCESS TOKEN

//ADD INTERCEPTOR FOR REFRESHING TOKEN

export default apiClient;
