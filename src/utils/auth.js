import Cookies from "js-cookie";

export const setTokens = (accessToken, refreshToken) => {
  Cookies.set('accessToken', accessToken, { expires: 1 }); 
  Cookies.set('refreshToken', refreshToken, { expires: 30 });
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
