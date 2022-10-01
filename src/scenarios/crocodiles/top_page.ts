import { sleep, check, fail } from "k6";
import http from "k6/http";
import envs from "@/envs";
import Example from "@/models/api/example";
import { uuidv4, randomString } from "@/utils/random";
import bindJSON from "@/utils/bind_json";
import {
  LoginCredentials,
  UserRegisterRequest,
  Crocodile,
} from "@/models/types/example";
import Options from "@/scenarios/crocodiles/top_page_options";

export let options = Options[envs.OPTION];

const example = new Example(envs.EXAMPLE_BASE_URL);

interface Data {
  session: string;
}

export function setup() {
  const username = uuidv4();
  const password = randomString(16);

  // register
  const registerPayload: UserRegisterRequest = {
    username: username,
    password: password,
    email: `${randomString(8)}@${randomString(3)}.com`,
  };
  const registerRes = example.PostUserRegister(registerPayload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (registerRes.status !== 201) {
    fail(`Failed login, status: ${registerRes.status_text}`);
  }

  // login
  const payload: LoginCredentials = {
    username: username,
    password: password,
  };
  const res = example.PostAuthCookieLogin(payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jar = http.cookieJar();
  const cookies = jar.cookiesForURL(res.url);
  const session = cookies.sessionid[0];

  if (!session || res.status !== 200) {
    fail(`Failed login, status: ${res.status_text}`);
  }
  const data: Data = {
    session: session,
  };
  return data;
}

export default (data: Data) => {
  check(example.GetCrocodiles(), {
    "get crocodiles response status is 200": (r) => {
      const parsed: [Crocodile | undefined, boolean] = bindJSON<Crocodile>(
        String(r.body)
      );
      let ok = parsed[1];
      return r.status === 200 && ok;
    },
  });

  check(
    example.GetMyCrocodiles({
      cookies: { sessionid: data.session },
    }),
    {
      "get my crocodiles response status is 200": (r) => {
        const parsed: [Crocodile | undefined, boolean] = bindJSON<Crocodile>(
          String(r.body)
        );
        let ok = parsed[1];
        return r.status === 200 && ok;
      },
    }
  );

  sleep(1);
};
