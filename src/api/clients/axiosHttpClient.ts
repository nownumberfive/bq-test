import type {
  Axios,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import type { HttpClient } from '@/types/http';
import axios from 'axios';
import { HEADER_AUTH_KEY } from '@/constants/app';
import { HttpError } from '@/api/errors/httpError';
import { HTTP_METHOD } from '@/types/http';
import { useAuthStore } from '@/stores/auth.store';
import config from "@/config";

export class AxiosHttpClient implements HttpClient {
  private axios: Axios;

  constructor() {
    this.axios = axios.create({
      baseURL: config.env.BACKEND_URL,
    });

    this.axios.interceptors.request.use(this.requestInterceptors);
  }

  private requestInterceptors(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const { accessToken } = useAuthStore();
    const headers = {
      ...config.headers,
    } as AxiosRequestHeaders;

    if (accessToken) {
      headers[HEADER_AUTH_KEY] = `Bearer ${accessToken}`;
    }

    return {
      ...config,
      headers,
    };
  }

  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.axios
      .request(config)
      .then((r) => r.data as T)
      .catch((e) => {
        throw new HttpError(e);
      });
  }

  get<T>(url: string, payload?: any): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      url,
      method: HTTP_METHOD.GET,
      params: payload,
    };

    return this.request(requestConfig);
  }

  post<T>(url: string, payload?: any): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      url,
      method: HTTP_METHOD.POST,
      data: payload,
    };

    return this.request(requestConfig);
  }
}
