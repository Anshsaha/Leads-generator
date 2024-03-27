import { CanceledError } from "axios";
import axiosInstance from "../utils/TokenInterceptor";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getResults = async (keyword: any) => {
  try {
    const response = await axiosInstance.get(
      `${baseURL}/get-results/${keyword}/`
    );
    if (response.data?.success) {
      return { data: response?.data?.data };
    } else {
      return { error: response?.data?.message };
    }
  } catch (error: any) {
    if (error instanceof CanceledError) return;
    return { error: error.response?.data?.message };
  }
};

export const getResult = async (keyword: any, id: any) => {
  try {
    const response = await axiosInstance.get(
      `${baseURL}/get-result/${keyword}/${id}/`
    );
    if (response.data?.success) {
      return { data: response?.data?.data };
    } else {
      return { error: response?.data?.message };
    }
  } catch (error: any) {
    if (error instanceof CanceledError) return;
    return { error: error.response?.data?.message };
  }
};
