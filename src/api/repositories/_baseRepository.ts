import type { HttpClient } from '@/types/http';

export type RParams = {
  httpClient: HttpClient;
};

export class BaseRepository {
  http: HttpClient;

  constructor({ httpClient }: RParams) {
    this.http = httpClient;
  }
}
