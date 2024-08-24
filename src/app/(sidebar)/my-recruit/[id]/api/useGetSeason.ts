import { http } from '@/apis/http';
import { useQuery } from '@tanstack/react-query';

export interface SeasonType {
  name: string;
}

const getSeasons = () => {
  return http.get<SeasonType[]>({
    url: `/seasons`,
  });
};

export const useGetSeasons = () =>
  useQuery({
    queryKey: ['get-seasons'],
    queryFn: async () => {
      const res = await getSeasons();
      return res.data;
    },
  });
