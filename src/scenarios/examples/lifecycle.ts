import { check } from "k6";
import { Options } from "k6/options";
import exec from "k6/execution";
import Example from "@/models/api/example";
import envs from "@/envs";

// https://k6.io/docs/using-k6/test-life-cycle/
// https://k6.io/docs/using-k6/execution-context-variables/

export let options: Options = {
  scenarios: {
    scenario_name: {
      executor: "per-vu-iterations",
      vus: 2,
      iterations: 4,
      maxDuration: "30s",
    },
    scenario_name_shared: {
      executor: "shared-iterations",
      vus: 2,
      iterations: 4,
      maxDuration: "30s",
    },
  },
};

console.log(
  "init code: Load local files, import modules, declare global variables"
);

interface Data {
  setupString: string;
}

export function setup() {
  console.log("setup code: Set up data for processing, share data among VUs");
  const data: Data = {
    setupString: "finished setup",
  };
  return data;
}

export function teardown() {
  console.log(
    "teardown code: Process result of setup code, stop test environment	"
  );
}

export default (data: Data) => {
  if (__VU == 1 && __ITER == 0) {
    console.log(data.setupString);
  }

  console.log(
    `SCENARIO: ${exec.scenario.name} :VU: ${__VU}  -  ITER: ${__ITER}`
  );

  check(() => exec.vu.idInInstance, {
    "check execution context vu Id == __VU": (r) => {
      return r() == __VU;
    },
  });

  check(() => exec.vu.iterationInInstance, {
    "check execution context iter Id == __ITER": (r) => {
      return r() == __ITER;
    },
  });

  const example = new Example(envs.EXAMPLE_BASE_URL);

  if (exec.scenario.iterationInInstance == 0) {
    check(example.GetRootResponse(), {
      "get root response status is 200": (r) => {
        return r.status === 200;
      },
    });
  }
};
