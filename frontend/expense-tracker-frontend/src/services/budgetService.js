import axiosInstance from './axiosInstance';

const BASE = '/api/budgets';

// The backend only exposes "create or update current month's budget" and
// "get current month's budget" — there is no list-all or delete endpoint,
// so the Budget page is built around a single current-month record.

export const getCurrentMonthBudget = async () => {
  const { data } = await axiosInstance.get(`${BASE}/current`);
  return data; // Budget
};

export const setBudget = async ({ amount, month }) => {
  const { data } = await axiosInstance.post(BASE, { amount, month });
  return data; // Budget
};

export default { getCurrentMonthBudget, setBudget };
