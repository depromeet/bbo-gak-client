export function immer<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
