import { generateContext } from '@/lib';
import { GetMemosResponse, useGetMemos } from '../api/useGetMemos';
import { StrictPropsWithChildren } from '@/types';

const [MemosProvider, useMemosContext] = generateContext<{ memos: GetMemosResponse; cardId: string }>({
  name: 'memos-provider',
});

function MemosFetcher({ cardId, children }: StrictPropsWithChildren<{ cardId: string }>) {
  const { data } = useGetMemos(cardId);

  return (
    <MemosProvider memos={data} cardId={cardId}>
      {children}
    </MemosProvider>
  );
}

export { MemosFetcher, useMemosContext };
