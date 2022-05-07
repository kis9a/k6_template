export default function bindJSON<T>(body: string): [T | undefined, boolean] {
  let ok = true;
  let rb: T;
  try {
    rb = JSON.parse(String(body));
    return [rb, ok];
  } catch (e) {
    ok = false;
    return [undefined, ok];
  }
}
