import http from "k6/http";

export default class Example {
  public constructor(public EXAMPLE_BASE_URL: string) {}

  GetRootResponse() {
    return http.get(this.EXAMPLE_BASE_URL);
  }
}
