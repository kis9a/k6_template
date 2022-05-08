## k6-load-testing with typescript

- k6 script write typescript and bundle to es6 javascript by esbuild.
- esbuild faster than babel + Webpack <https://github.com/grafana/k6-template-typescript>.

## Required

### Install k6

[k6 - installation](https://k6.io/docs/getting-started/installation/)

```
brew install k6
```

## Development

### Install dependencies

```
yarn install
```

### Build sources

```
yarn build
yarn watch
```

### Too many open file error

if occur "socket: Too many open files" error, you need to change.

```
ulimit -n 1000000
```

### Environment variables

[Environment variables - src/envs/index.ts](/src/envs/index.ts)

### Scripts

- [package.json - scripts](./package.json)

  - build
  - watch
  - health
  - list
  - clean

- [/scripts](./scripts/)

### Examples

- <https://test-api.k6.io>
- [k6/examples](./src/scenarios/examples/)

```
k6 run ./dist/examples/health_test.js
k6 run --vus 3 --duration 5s ./dist/examples/life_cyecle.js
```

### Referenced

- docs: <https://k6.io/docs/>
- testapi: <https://test-api.k6.io/>
