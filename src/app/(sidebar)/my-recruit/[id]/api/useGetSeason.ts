import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface SeasonType {
  name: string;
}

const getSeasons = () => {
  return http.get<SeasonType[]>({
    url: `/seasons`,
  });
};

export function useGetSeasons() {
  const result = useSuspenseQuery({
    queryKey: ['get-seasons'],
    queryFn: () => getSeasons(),
  });

  return result.data as unknown as SeasonType[];
}
