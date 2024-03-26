import type { IResponseData, IResponseMessage } from '@/types/http';
import type { IUser, IToken, LoginParams, RegisterParams } from '@/types/auth';
import { BaseRepository } from '@/api/repositories/_baseRepository';

export class RAuth extends BaseRepository {
  async register(params: RegisterParams) {
    return this.http.post<IResponseMessage>('/register', params);
  }

  async login(params: LoginParams) {
    return this.http.post<IToken>('/login', params);
  }

  async about() {
    return this.http.get<IResponseData<IUser>>('/about').then((res) => res.data);
  }
}
