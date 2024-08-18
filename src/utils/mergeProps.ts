/**
 * https://github.com/andrewbranch/merge-props/blob/master/src/index.ts
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

function pushProp(target: { [key: string]: any }, key: string, value: any): void {
  if (key === 'className') {
    target.className = [target.className, value].join(' ').trim();
  } else if (key === 'style') {
    target.style = { ...target.style, ...value };
  } else if (typeof value === 'function') {
    const oldFn = target[key] as Function | undefined;
    target[key] = oldFn
      ? (...args: any[]) => {
          oldFn(...args);
          (value as Function)(...args);
        }
      : value;
  } else if (value === undefined || (typeof value !== 'object' && value === target[key])) {
    return;
  } else if (!(key in target)) {
    target[key] = value;
  } else {
    throw new Error(
      `Didn’t know how to merge prop '${key}'. ` + `Only 'className', 'style', and event handlers are supported`,
    );
  }
}

export function mergeProps<T extends {}[]>(
  ...props: T
): {
  [K in keyof UnionToIntersection<T[number]>]: K extends 'className'
    ? string
    : K extends 'style'
      ? UnionToIntersection<T[number]>[K]
      : Exclude<Extract<T[number], { [Q in K]: unknown }>[K], undefined>;
} {
  if (props.length === 1) {
    return props[0] as any;
  }

  return props.reduce((merged, ps: any) => {
    for (const key in ps) {
      pushProp(merged, key, ps[key]);
    }
    return merged;
  }, {}) as any;
}
