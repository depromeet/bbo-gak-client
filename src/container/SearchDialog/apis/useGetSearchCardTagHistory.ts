import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

type Response = Array<{
  id: number;
  name: string;
  type: '인성' | '역량';
}>;

export const GET_SEARCH_CARD_TAG_HISTORY = 'getSearchCardTagHistory';

function getSearchCardTagHistory() {
  return http.get<Response>({ url: '/search/card-tag-history' });
}

export function useGetSearchCardTagHistory() {
  const result = useSuspenseQuery({
    queryKey: [GET_SEARCH_CARD_TAG_HISTORY],
    queryFn: () => getSearchCardTagHistory(),
  });

  return result.data;
}
