import { CanceledError } from "axios";
import axiosInstance from "../utils/TokenInterceptor";

const baseURL = process.env.REACT_APP_BASE_URL;

export const Login = async (user: any) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/login/`, user);
    if (response.data?.success) {
      const token = response.data.data;
      localStorage.setItem("token", JSON.stringify(token));
      return { data: response?.data?.message };
    } else {
      return { error: response?.data?.message };
    }
  } catch (error: any) {
    if (error instanceof CanceledError) return;
    return { error: error.response?.data?.message };
  }
};
