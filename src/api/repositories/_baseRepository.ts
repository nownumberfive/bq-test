import type { HttpClient } from '@/api/types/http';

export type RParams = {
  httpClient: HttpClient;
};

export class BaseRepository {
  http: HttpClient;

  constructor({ httpClient }: RParams) {
    this.http = httpClient;
  }
}
