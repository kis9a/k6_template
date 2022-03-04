import { sleep, check } from "k6";
import { Options } from "k6/options";
import Example from "@/models";
import envs from "@/envs";

export let options: Options = {
  vus: 1,
  duration: "1s",
};

export default () => {
  const example = new Example(
    envs.EXAMPLE_BASE_URL ? envs.EXAMPLE_BASE_URL : "https://test-api.k6.io"
  );
  check(example.GetRootResponse(), {
    "get root response status is 200": (r) => {
      const parsed: [any | undefined, boolean] = bindJSON<any>(String(r.body));
      let ok = parsed[1];
      return r.status === 200 && ok;
    },
  });

  sleep(1);
};

function bindJSON<T>(body: string): [T | undefined, boolean] {
  let ok = true;
  let rb: T;
  try {
    rb = JSON.parse(String(body));
    return [rb, ok];
  } catch (e) {
    ok = false;
    return [undefined, ok];
  }
}
