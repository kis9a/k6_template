import { check } from "k6";
import { Options } from "k6/options";
import Example from "@/models/api/example";
import envs from "@/envs";

export let options: Options = {
  vus: 1,
  duration: "1s",
};

export default () => {
  const example = new Example(envs.EXAMPLE_BASE_URL);
  check(example.GetRootResponse(), {
    "get root response status is 200": (r) => {
      return r.status === 200;
    },
  });
};
