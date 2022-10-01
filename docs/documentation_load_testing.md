## Write LDR (Load-testing Decision Records)

An Load-testing Decision Record (LDR) is a document that captures an important Load-testing decision made along with its context and consequences.
Write your load test scenario and its background and check it with your teammates. It also describes things that should be especially noted and things that are likely to be bottlenecks in load testing. Also, consider the scenario of the load test itself, and until you get good results, you need to look carefully at why things aren't going the way you want them to. Because the script is badly written and you may not get good results.

### Examples

docs/LDR\_${sceanrio_name}

### Infrastructure for k6 execution

repository: <https://xxxxxxxxxxxxxxxxxxxx>

[Benchmarking k6 on AWS](https://k6.io/docs/testing-guides/running-large-tests/#benchmarking-k6-on-aws)

If finished testing, you should destroy or stop infra resources, Because it is expensive.

### Provisioning example

[Provisioning k6 on EC2](./provisioning_k6_on_ec2.md)

### Troubleshooting

If you run a large load test, it is highly likely that the following error will occur.

[Errors on large testing](https://k6.io/docs/testing-guides/running-large-tests/#errors)

```
# dealing with e.g.
sudo sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sudo sysctl -w net.ipv4.tcp_tw_reuse=1
sudo sysctl -w net.ipv4.tcp_timestamps=1
ulimit -n 250000
```
