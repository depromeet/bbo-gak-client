'use client';

import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // NOTE: 추후 배포 시 변경
      staleTime: Infinity,
    },
    mutations: {
      networkMode: 'always',
    },
  },
};

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(queryClientOption));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
