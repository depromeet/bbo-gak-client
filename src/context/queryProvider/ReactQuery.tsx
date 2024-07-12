'use client';

import type { QueryClientConfig } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
    mutations: {
      networkMode: 'always',
    },
  },
};

export default function ReactQuery({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(queryClientOption));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
