import type { ReactNode } from 'react';

export type StrictPropsWithChildren<P = unknown> = P & { children: ReactNode };
