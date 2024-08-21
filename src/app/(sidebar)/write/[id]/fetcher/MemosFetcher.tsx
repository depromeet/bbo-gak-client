import { generateContext } from '@/lib';
import { StrictPropsWithChildren } from '@/types';
import { GetMemosResponse, useGetMemos } from '../api/useGetMemos';

const [MemosProvider, useMemosContext] = generateContext<{ memos: GetMemosResponse; cardId: string }>({
  name: 'memos-provider',
});

function MemosFetcher({ cardId, children }: StrictPropsWithChildren<{ cardId: string }>) {
  const { data } = useGetMemos(cardId);

  return (
    <MemosProvider memos={data.data} cardId={cardId}>
      {children}
    </MemosProvider>
  );
}

export { MemosFetcher, useMemosContext };
