import axios from 'axios';

export const NEXT_PUBLIC_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL,
});

export const http = {
  setAuthorizationHeader(accessToken: string | undefined) {
    axiosInstance.defaults.headers.Authorization = `tma query_id=AAF1rz01AgAAAHWvPTU4slSP&user=%7B%22id%22%3A5188202357%2C%22first_name%22%3A%22Ho%C3%A0ng%22%2C%22last_name%22%3A%22Minh%22%2C%22username%22%3A%22tnmhoang%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1729359591&hash=5481e10dc512da9eddef6dd9afb27da84c0f4c67b377f3b3df684b12d7618ef0`;
  },
};

export const handleErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return 'Oops! Something went wrong';
  }

  if (!error.response) {
    return error?.message;
  }

  return error.response.data?.message;
};

export default axiosInstance;
