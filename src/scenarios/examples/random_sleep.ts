import { check, sleep } from "k6";
import Example from "@/models/example";
import envs from "@/envs";
import { Options } from "k6/options";
import { randomIntBetween } from "@/utils/random";

export let options: Options = {
  vus: 1,
  duration: "10s",
};

export default () => {
  const random_number = randomIntBetween(1, 10);
  const example = new Example(envs.EXAMPLE_BASE_URL);

  console.log(random_number);
  if (random_number < 6) {
    check(example.GetRootResponse(), {
      "get root response status is 200": (r) => {
        return r.status === 200;
      },
    });
  } else {
    console.log("sleep");
    sleep(1);
  }
};
