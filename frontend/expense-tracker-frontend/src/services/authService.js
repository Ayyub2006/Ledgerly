import axiosInstance from './axiosInstance';

// Backend returns the JWT as a raw string body on login, and a User object on register.

export const register = async ({ name, email, password }) => {
  const { data } = await axiosInstance.post('/api/auth/register', {
    name,
    email,
    password,
  });
  return data; // User
};

export const login = async ({ email, password }) => {
  const { data } = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  // data is the raw JWT string
  return typeof data === 'string' ? data.replace(/^"|"$/g, '') : data;
};

export default { register, login };
