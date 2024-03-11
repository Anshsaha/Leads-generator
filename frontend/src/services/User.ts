import axios, { CanceledError } from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const addUser = async (payload: any) => {
  try {
    const response = await axios.post(`${baseURL}/add-user/`, payload);
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

export const editUser = async (id: any, payload: any) => {
  try {
    const response = await axios.put(`${baseURL}/edit-user/${id}/`, payload);
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

export const deleteUser = async (id: any) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-user/${id}/`);
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

export const getAllUsers = async () => {
  try {
    const response: any = await axios.get(`${baseURL}/get-all-users/`);
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
