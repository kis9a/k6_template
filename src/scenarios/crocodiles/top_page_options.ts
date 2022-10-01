import { Options as OptionsType } from "k6/options";

const Options: { [key in string]: OptionsType } = {};

Options.health_check = {
  vus: 1,
  duration: "1s",
};

Options.smook_shared_iterations = {
  scenarios: {
    contacts: {
      executor: "shared-iterations",
      vus: 50,
      iterations: 50 * 120,
      maxDuration: "10m",
    },
  },
  thresholds: {
    http_req_duration: ["p(99)<2000"],
    checks: ["rate>0.99"],
  },
};

Options.spike_shared_iterations = {
  scenarios: {
    contacts: {
      executor: "shared-iterations",
      vus: 400,
      iterations: 400 * 60,
      maxDuration: "10m",
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    checks: ["rate>0.95"],
  },
};

export default Options;
