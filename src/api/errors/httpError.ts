import type { AxiosError } from 'axios';

export class HttpError extends Error {
  message: string;
  status?: number;
  statusText?: string;

  constructor(error: AxiosError) {
    const data = (error.response?.data || {}) as any;
    const message = data?.message || data?.error || error.message || '';

    super(message);

    this.message = message;
    this.status = error.response?.status;
    this.statusText = error.response?.statusText;
  }
}
