import { http } from '@/apis/http';
import { useQuery } from '@tanstack/react-query';

export interface SeasonType {
  name: string;
}

export const GET_SEASONS = 'get-seasons';

const getSeasons = () => {
  return http.get<SeasonType[]>({
    url: `/seasons`,
  });
};

export function useGetSeasons() {
  const result = useQuery({
    queryKey: [GET_SEASONS],
    queryFn: async () => {
      const res = await getSeasons();
      return res.data;
    },
  });

  return result;
}
