import axiosInstance from './axiosInstance';

export const getDashboardSummary = async () => {
  const { data } = await axiosInstance.get('/api/dashboard');
  return data; // DashboardResponse
};

export default { getDashboardSummary };
