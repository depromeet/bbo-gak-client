import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '@/apis/http';

type Response = {
  data: Array<{
    name: string;
  }>;
};

export const GET_SEASONS_KEY = 'seasons';

function getSeasons() {
  return http.get({ url: '/seasons' });
}

export function useGetSeasons() {
  const result = useSuspenseQuery({ queryKey: [GET_SEASONS_KEY], queryFn: getSeasons });

  return result.data as unknown as Response;
}
