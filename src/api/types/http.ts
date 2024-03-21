export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
}

export type IResponseData<T> = {
  data: T;
};

export type IResponseMessage = {
  message: string;
};

export interface HttpClient {
  get<T = void>(path: string, params?: any): Promise<T>;
  post<T = void>(path: string, params?: any): Promise<T>;
}
