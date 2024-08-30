import { http } from '@/apis/http';
import { useQuery } from '@tanstack/react-query';

interface RecruitTitleType {
  id: number;
  title: string;
}

type Response = RecruitTitleType[];

export const GET_RECRUIT_TITLES_KEY = 'recruit-titles';

function getRecruiteTitles() {
  return http.get<Response>({ url: '/recruits/titles' });
}

export function useGetRecruitTitles() {
  return useQuery({
    queryKey: [GET_RECRUIT_TITLES_KEY],
    queryFn: async () => {
      const res = await getRecruiteTitles();

      return res.data;
    },
  });
}
