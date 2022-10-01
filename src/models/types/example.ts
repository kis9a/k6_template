export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserRegisterRequest {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

export interface UserRegisterResponse {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
}

export interface PostCrocodileRequest {
  name: string;
  sex: string;
  date_of_birth: string;
}

export interface Crocodile {
  id: number;
  name: string;
  sex: string;
  date_of_birth: string;
  age: string;
}
