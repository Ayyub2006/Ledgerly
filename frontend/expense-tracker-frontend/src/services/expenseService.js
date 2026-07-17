import axiosInstance from './axiosInstance';

const BASE = '/api/expenses';

export const getAllExpenses = async () => {
  const { data } = await axiosInstance.get(BASE);
  return data;
};

export const getExpensesPage = async ({ page = 0, size = 5, sortBy = 'date', direction = 'desc' } = {}) => {
  const { data } = await axiosInstance.get(`${BASE}/page`, {
    params: { page, size, sortBy, direction },
  });
  return data; // PageExpense
};

export const searchExpenses = async ({ keyword, page = 0, size = 5 }) => {
  const { data } = await axiosInstance.get(`${BASE}/search`, {
    params: { keyword, page, size },
  });
  return data; // PageExpense
};

export const getExpensesByCategory = async (categoryId, { page = 0, size = 5 } = {}) => {
  const { data } = await axiosInstance.get(`${BASE}/category/${categoryId}`, {
    params: { page, size },
  });
  return data;
};

export const getExpenseById = async (id) => {
  const { data } = await axiosInstance.get(`${BASE}/${id}`);
  return data;
};

export const createExpense = async (payload) => {
  const { data } = await axiosInstance.post(BASE, payload);
  return data;
};

export const updateExpense = async (id, payload) => {
  const { data } = await axiosInstance.put(`${BASE}/${id}`, payload);
  return data;
};

export const deleteExpense = async (id) => {
  await axiosInstance.delete(`${BASE}/${id}`);
};

export default {
  getAllExpenses,
  getExpensesPage,
  searchExpenses,
  getExpensesByCategory,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
