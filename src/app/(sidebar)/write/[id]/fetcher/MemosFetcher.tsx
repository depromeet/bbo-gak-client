import { generateContext } from '@/lib';
import { StrictPropsWithChildren } from '@/types';
import { GetMemosResponse, useGetMemos } from '../api/useGetMemos';

const [MemosProvider, useMemosContext] = generateContext<{
  memos: GetMemosResponse;
  cardId: number;
  refetch: () => void;
}>({
  name: 'memos-provider',
  defaultValue: { memos: [], cardId: 0, refetch: () => {} },
});

function MemosFetcher({ cardId, children }: StrictPropsWithChildren<{ cardId: string }>) {
  const { data, refetch } = useGetMemos(cardId);

  return (
    <MemosProvider memos={data} cardId={Number(cardId)} refetch={refetch}>
      {children}
    </MemosProvider>
  );
}

export { MemosFetcher, useMemosContext };
