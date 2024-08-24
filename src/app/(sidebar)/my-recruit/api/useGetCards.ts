import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TagType } from '@/types/info';

interface Props {
  type: string;
}

interface Response {
  data: Array<{
    id: number;
    title: string;
    updatedDate: string;
    tagList: Array<TagType>;
  }>;
}

export const GET_CARDS = 'cards';

function getCards({ type }: Props) {
  return http.get({ url: '/cards', params: { type } });
}

export function useGetCards({ type }: Props) {
  const result = useSuspenseQuery({ queryKey: [GET_CARDS, type], queryFn: () => getCards({ type }) });

  return result.data as unknown as Response;
}
