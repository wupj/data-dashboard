import axios from 'axios';

export interface HttpResponse<T = unknown> {
  message: string;
  code: number;
  data: T;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      throw new Error(res.message);
    } else {
      return res.data
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_error) => {
    // Handle error
  }
);

export default instance;
