'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useCreateQuery() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  return createQueryString;
}
