# k6_template

## Feature

- k6 script write Typescript and bundle to ES6 JavaScript by esbuild.
- esbuild faster than babel + Webpack. <https://github.com/grafana/k6-template-typescript>.
- code examples with k6 test API. <https://test-api.k6.io/>
- load-testing documentation example. [docs/documentation_load_testing.md](./docs/documentation_load_testing.md)
- example dashboard configuration for grafana and influxdb. [dashboards](./dashboards)
- example of infrastructure configuration modules. [infrasturcture/module](./infrastructure/module/)
- example of provisioning a k6 execution environment on EC2. [docs/provisioning_k6_on_ec2.md](./docs/provisioning_k6_on_ec2.md)

## Directory·Files

### Overview

- file, directory, resource name is expected snake_case.
- src/scenarios/${scenario}/\*\*.js builds to dist/${scenario}/\*\*.js. Run the built dist/${scenario}/\*\*.js script with k6.
- if you add a service to load test, add a directory under src/scenarios
- The environment variables used by k6 are managed in the envs/ directory.

```sh
.
├── dist
│   ├── crocodiles
│   │   ├── top_page.js
│   │   └── top_page.js.map
│   └── examples/
├── scripts
│   ├── build.mjs
│   └── k6.sh
├── src
│   ├── envs/
│   ├── models/
│   │   ├── api/
│   │   └── types/
│   ├── scenarios/
│   │   ├── crocodiles/
│   │   └── examples/
│   └── utils/
├── infrastructure/
├── dashboards/
├── docs/
├── docker-compose.yaml
├── Dockerfile
├── Makefile
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

## Developments

### Build sources

```
yarn build
yarn watch
```

### k6 without Docker

```
yarn run list

# e.g.
k6 run ./dist/examples/health_check.js
```

### Initialize docker

```
make build
make scripts
```

### Docker run k6

```
make list

./scripts/k6.sh

# e.g.
./scripts/k6.sh run -e EXAMPLE_BASE_URL="https://test-api.k6.io" examples/health_check.js
```

### k6 run with grafana influxdb (option)

```
docker network create k6-network
docker-compose up

# e.g.
docker-compose run k6 /scripts/examples/health_check.js
```

### Exec on Docker container

```
make tail
make exec
```
