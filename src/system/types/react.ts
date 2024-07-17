import {
  ElementType,
  RefObject,
  MutableRefObject,
  Ref,
  ReactNode,
} from 'react';

export type As<Props = any> = ElementType<Props>;

export type ReactRef<T> = RefObject<T> | MutableRefObject<T> | Ref<T>;

export type StrictPropsWithChildren<P = unknown> = P & { children: ReactNode };
