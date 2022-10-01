import { check, sleep, fail } from "k6";
import Example from "@/models/api/example";
import { Crocodile } from "@/models/types/example";
import bindJSON from "@/utils/bind_json";
import envs from "@/envs";
import { Options } from "k6/options";
import { randomIntBetween } from "@/utils/random";

export let options: Options = {
  vus: 1,
  duration: "5s",
};

interface Data {
  crocodiles: Crocodile[];
}

export function setup() {
  const example = new Example(envs.EXAMPLE_BASE_URL);
  const res = example.GetCrocodiles();
  const parsed: [Crocodile | undefined, boolean] = bindJSON<Crocodile>(
    String(res.body)
  );
  let ok = parsed[1];

  if (!ok) {
    fail("[ERROR]: can't bindJSON get crocodiles response");
  }
  return { crocodiles: parsed[0] };
}

export default (data: Data) => {
  const random_number = randomIntBetween(1, data.crocodiles.length);
  const example = new Example(envs.EXAMPLE_BASE_URL);

  console.log(random_number);

  if (random_number < 6) {
    check(example.GetCrocodile(random_number), {
      "get crocodile response status is 200": (r) => {
        const parsed: [Crocodile | undefined, boolean] = bindJSON<Crocodile>(
          String(r.body)
        );
        let ok = parsed[1];
        return r.status === 200 && ok;
      },
    });
  } else {
    console.log("sleep");
    sleep(randomIntBetween(1, 2));
  }
};
