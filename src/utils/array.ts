export const isDifferentArray = (a: unknown[] = [], b: unknown[] = []) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.some((item, index) => !Object.is(item, b[index]));
};
