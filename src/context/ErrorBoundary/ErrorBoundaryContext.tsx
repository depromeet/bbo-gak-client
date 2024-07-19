'use client';

import generateContext from '../generateContext/generateContext';

export const [ErrorboundaryProvider, useErrorBoundaryContext] = generateContext<{
  error: Error | null;
  resetErrorBoundary: () => void;
}>({
  name: 'global-error-boundary-context',
  defaultValue: { error: null, resetErrorBoundary: () => {} },
});
