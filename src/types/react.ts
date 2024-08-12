import { ElementType, RefObject, MutableRefObject, RefCallback, ReactNode } from 'react';

export type As<Props = any> = ElementType<Props>;

export type StrictPropsWithChildren<P = unknown> = P & { children: ReactNode };

export type ReactRef<T> = RefObject<T> | MutableRefObject<T> | RefCallback<T> | null;
