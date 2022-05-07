import http from "k6/http";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
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

export interface Crocodile {
  id: number;
  name: string;
  sex: string;
  date_of_birth: string;
  age: string;
}
export default class Example {
  public constructor(
    public EXAMPLE_BASE_URL: string = "https://test-api.k6.io"
  ) {}
  GetRootResponse() {
    return http.get(this.EXAMPLE_BASE_URL);
  }

  PostAuthLogin(req: LoginCredentials) {
    return http.post(
      this.EXAMPLE_BASE_URL + "/auth/cookie/login/",
      JSON.stringify(req)
    );
  }

  GetCrocodiles() {
    return http.get(this.EXAMPLE_BASE_URL + "/public/crocodiles/");
  }

  GetCrocodile(id: number) {
    return http.get(this.EXAMPLE_BASE_URL + `/public/crocodiles/${id}`);
  }

  PostUserRegister(req: User) {
    return http.post(
      this.EXAMPLE_BASE_URL + "/auth/cookie/login/",
      JSON.stringify(req)
    );
  }
}
