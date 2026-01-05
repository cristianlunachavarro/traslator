export interface UserTypes {
  token: AuthToken;
  id: string,
  username: string,
  email: string
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  error: boolean;
  user?: UserTypes;
  message?: string;
  token?: string
}

export type AuthToken = string;
  