export type Envs = {
  EXAMPLE_BASE_URL: string;
};

const envs: Envs = {
  EXAMPLE_BASE_URL: __ENV.EXAMPLE_BASE_URL,
};

export default envs;
