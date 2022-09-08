import axios, { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'redux';

import env from '../environment';
import { errorHappened } from './';

const instance = axios.create({
  baseURL: env.ENDPOINT,
  timeout: 60 * 1000,
});

const setup = (dispatch: Dispatch) => {
  instance.interceptors.response.use(undefined, (error) => {
    dispatch(errorHappened({ message: error.message, code: error.response?.status }));
    return Promise.reject(error);
  });
};

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => (await instance.get(url, config)).data as T;
// const post = async <T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> =>
//   (await instance.post(url, data, config)).data as T;
// const put = async <T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> =>
//   (await instance.put(url, data, config)).data as T;
// const patch = async <T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> =>
//   (await instance.patch(url, data, config)).data as T;
// const Delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => (await instance.delete(url, config)).data as T;

export default {
  setup,
  get,
  // post,
  // put,
  // patch,
  // delete: Delete,
  // postForm: instance.postForm,
  instance,
};
