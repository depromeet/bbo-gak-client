import { http } from '@/apis/http';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { SearchedCardType } from '@/container/SearchDialog/types';

type Response = Array<SearchedCardType>;

export const GET_SEARCH_CARDS = 'getSearchCards';

function getSearchCards(ids: number[]) {
  return http.get<Response>({
    url: `/search/cards?tag-ids=${ids.join(',')}`,
  });
}

export function useGetSearchCards() {
  const result = useMutation({ mutationFn: (ids: number[]) => getSearchCards(ids) });

  return result;
}
