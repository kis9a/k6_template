import { sleep, check } from "k6";
import { randomString, randomItem } from "@/utils/random";
import envs from "@/envs";
import Example from "@/models/api/example";
import { LoginCredentials, PostCrocodileRequest } from "@/models/types/example";
import { Options } from "k6/options";

export let options: Options = {
  scenarios: {
    contacts: {
      executor: "shared-iterations",
      vus: 2,
      iterations: 2 * 3,
      maxDuration: "1m",
    },
  },
};

const example = new Example(envs.EXAMPLE_BASE_URL);

interface Data {
  authToken: string;
}

export function setup() {
  let authToken: string = "";

  if (authToken === "") {
    const req: LoginCredentials = {
      username: `jehadfadfeeeaefaefe`,
      password: `unkunkodadffa`,
    };

    const res = example.PostAuthTokenLogin(req, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    authToken = res.json("access") as string;
  }
  const data: Data = {
    authToken: authToken,
  };
  return data;
}

export default (data: Data) => {
  let payload: PostCrocodileRequest = {
    name: `k6 ${randomString(4)}`,
    date_of_birth: "2022-01-01",
    sex: randomItem(["M", "F"]),
  };

  check(
    example.PostCrocodile(payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.authToken}`,
      },
    }),
    {
      "post crocodile response status is 200": (r) => {
        return r.status === 201;
      },
    }
  );
  sleep(1);
};
