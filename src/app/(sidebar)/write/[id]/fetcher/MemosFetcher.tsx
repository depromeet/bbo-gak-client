import { generateContext } from '@/lib';
import { StrictPropsWithChildren } from '@/types';
import { GetMemosResponse, useGetMemos } from '../api/useGetMemos';

const [MemosProvider, useMemosContext] = generateContext<{ memos: GetMemosResponse; cardId: number }>({
  name: 'memos-provider',
  defaultValue: { memos: [], cardId: 0 },
});

function MemosFetcher({ cardId, children }: StrictPropsWithChildren<{ cardId: string }>) {
  const { data } = useGetMemos(cardId);

  return (
    <MemosProvider memos={data.data} cardId={Number(cardId)}>
      {children}
    </MemosProvider>
  );
}

export { MemosFetcher, useMemosContext };
