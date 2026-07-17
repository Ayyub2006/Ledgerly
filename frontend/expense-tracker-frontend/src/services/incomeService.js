import axiosInstance from './axiosInstance';

const BASE = '/api/income';

export const getAllIncomes = async () => {
  const { data } = await axiosInstance.get(BASE);
  return data;
};

export const getIncomePage = async ({ page = 0, size = 5, sortBy = 'date', direction = 'desc' } = {}) => {
  const { data } = await axiosInstance.get(`${BASE}/page`, {
    params: { page, size, sortBy, direction },
  });
  return data; // PageIncome
};

export const searchIncome = async ({ keyword, page = 0, size = 5 }) => {
  const { data } = await axiosInstance.get(`${BASE}/search`, {
    params: { keyword, page, size },
  });
  return data;
};

export const getIncomeById = async (id) => {
  const { data } = await axiosInstance.get(`${BASE}/${id}`);
  return data;
};

export const createIncome = async (payload) => {
  const { data } = await axiosInstance.post(BASE, payload);
  return data;
};

export const updateIncome = async (id, payload) => {
  const { data } = await axiosInstance.put(`${BASE}/${id}`, payload);
  return data;
};

export const deleteIncome = async (id) => {
  await axiosInstance.delete(`${BASE}/${id}`);
};

export default {
  getAllIncomes,
  getIncomePage,
  searchIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};
