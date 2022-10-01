import http, { BatchRequests, RefinedParams, ResponseType } from "k6/http";
import {
  LoginCredentials,
  UserRegisterRequest,
  PostCrocodileRequest,
} from "@/models/types/example";

export default class Example {
  public constructor(
    public EXAMPLE_BASE_URL: string = "https://test-api.k6.io"
  ) {}

  BatchRequest(req: BatchRequests) {
    http.batch(req);
  }

  GetRootResponse() {
    return http.get(this.EXAMPLE_BASE_URL);
  }

  GetCrocodiles() {
    return http.get(this.EXAMPLE_BASE_URL + "/public/crocodiles/");
  }

  GetCrocodile(id: number) {
    return http.get(this.EXAMPLE_BASE_URL + `/public/crocodiles/${id}`);
  }

  PostUserRegister(
    req: UserRegisterRequest,
    params: RefinedParams<ResponseType | undefined> = {}
  ) {
    return http.post(
      this.EXAMPLE_BASE_URL + "/user/register/",
      JSON.stringify(req),
      params
    );
  }

  PostAuthTokenLogin(
    req: LoginCredentials,
    params: RefinedParams<ResponseType | undefined> = {}
  ) {
    return http.post(
      this.EXAMPLE_BASE_URL + "/auth/token/login/",
      JSON.stringify(req),
      params
    );
  }

  PostAuthCookieLogin(
    req: LoginCredentials,
    params: RefinedParams<ResponseType | undefined> = {}
  ) {
    return http.post(
      this.EXAMPLE_BASE_URL + "/auth/cookie/login/",
      JSON.stringify(req),
      params
    );
  }

  PostCrocodile(
    req: PostCrocodileRequest,
    params: RefinedParams<ResponseType | undefined> = {}
  ) {
    return http.post(
      this.EXAMPLE_BASE_URL + `/my/crocodiles/`,
      JSON.stringify(req),
      params
    );
  }

  GetMyCrocodiles(params: RefinedParams<ResponseType | undefined> = {}) {
    return http.get(this.EXAMPLE_BASE_URL + `/my/crocodiles/`, params);
  }
}
