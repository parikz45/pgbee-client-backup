import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = getRefreshToken();
      try {
        const res = await axios.post(`${BASE_URL}/auth/token/refresh`, {
          refreshToken: refresh,
        });

        const { accessToken, refreshToken } = res.data;
        setTokens(accessToken, refreshToken);

        err.config.headers.Authorization = `Bearer ${accessToken}`;
        return api(err.config); 
      } catch (error) {
        clearTokens();
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
