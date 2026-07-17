import axiosInstance from './axiosInstance';

const BASE = '/api/categories';

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get(BASE);
  return data; // array
};

export const getCategoryById = async (id) => {
  const { data } = await axiosInstance.get(`${BASE}/${id}`);
  return data;
};

export const createCategory = async (payload) => {
  const { data } = await axiosInstance.post(BASE, payload);
  return data;
};

export const updateCategory = async (id, payload) => {
  const { data } = await axiosInstance.put(`${BASE}/${id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  await axiosInstance.delete(`${BASE}/${id}`);
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
