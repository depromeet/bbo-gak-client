'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useCallback, ComponentProps } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Funnel, FunnelProps, Step, StepProps } from './Funnel';
import { NonEmptyArray } from '@/system/components/Funnel/Funnel';
import { generateContext } from '@/lib';
import useCreateQuery from '@/hooks/useCreateQuery';

export interface SetStepOptions {
  stepChangeType?: 'push' | 'replace';
  preserveQuery?: boolean;
  query?: Record<string, any>;
}

const [FunnelProvider, useFunnelContext] = generateContext<{
  setStep: <Steps extends NonEmptyArray<string>>(step: Steps[number], setStepOptions?: SetStepOptions) => void;
}>({
  name: 'funnel',
  defaultValue: { setStep: () => {} },
});

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = ComponentProps<typeof AnimatePresence> &
  Pick<FunnelProps<Steps>, 'children'>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

const DEFAULT_STEP_QUERY_KEY = 'funnel-step';

const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  },
): FunnelComponent<Steps> => {
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;
  const queryCreator = useCreateQuery();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setStep = useCallback(
    (step: Steps[number], setStepOptions?: SetStepOptions) => {
      const { preserveQuery = false } = setStepOptions ?? {};
      const newQuery = queryCreator(stepQueryKey, step);
      const url = `?${preserveQuery ? searchParams + newQuery : newQuery}`;

      options?.onStepChange?.(step);

      switch (setStepOptions?.stepChangeType) {
        case 'replace':
          router.replace(url);
          return;
        case 'push':
        default:
          router.push(url);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, router],
  );

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          const step = useSearchParams().get(stepQueryKey) ?? options?.initialStep;

          if (!step) {
            throw new Error(
              `표시할 스텝을 ${stepQueryKey} 쿼리 파라미터에 지정해주세요. 쿼리 파라미터가 없을 때 초기 스텝을 렌더하려면 useFunnel의 두 번째 파라미터 options에 initialStep을 지정해주세요.`,
            );
          }
          return (
            <FunnelProvider setStep={setStep}>
              <Funnel<Steps> steps={steps} step={step} {...props} />
            </FunnelProvider>
          );
        },
        {
          Step,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stepQueryKey],
  );

  return FunnelComponent;
};

export { useFunnel, useFunnelContext };
