import { generateContext } from '@/lib';
import { GetMemosResponse, useGetMemos } from '../api/useGetMemos';
import { StrictPropsWithChildren } from '@/types';

const [MemosProvider, useMemosContext] = generateContext<GetMemosResponse>({
  name: 'memos-provider',
});

function MemosFetcher({ cardId, children }: StrictPropsWithChildren<{ cardId: number }>) {
  const { data } = useGetMemos(cardId);

  return <MemosProvider {...data}>{children}</MemosProvider>;
}

export { MemosFetcher, useMemosContext };
