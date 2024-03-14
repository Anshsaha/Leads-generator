import axios, { CanceledError } from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const searchOrgs = async (payload: any) => {
  try {
    const response = await axios.post(
      `${baseURL}/search-organizations/`,
      payload
    );
    if (response.data?.success) {
      return { data: response?.data?.message };
    } else {
      return { error: response?.data?.message };
    }
  } catch (error: any) {
    if (error instanceof CanceledError) return;
    return { error: error.response?.data?.message };
  }
};
