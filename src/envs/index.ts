export type Envs = {
  EXAMPLE_BASE_URL: string;
  OPTION: string;
};

const envs: Envs = {
  EXAMPLE_BASE_URL: __ENV.EXAMPLE_BASE_URL,
  OPTION: __ENV.OPTION,
};

export default envs;
