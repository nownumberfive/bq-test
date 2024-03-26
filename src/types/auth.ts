export interface LoginParams {
  username: string,
  password: string,
}

export interface RegisterParams {
  username: string,
  password: string,
}

export interface IToken {
  token: string,
}

export interface IUser {
  id: number,
  username: string,
  about?: string,
}
