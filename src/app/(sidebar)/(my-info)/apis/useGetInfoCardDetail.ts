import { http } from '@/apis/http';
import { InfoType, TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface GetInfoCardDetailResponse {
  title: string;
  content: string;
  updatedDate: string;
  cardTypeValueList: InfoType[];
  tagList: TagType[];
}

const getInfoCardDetail = (cardId: number) =>
  http.get<GetInfoCardDetailResponse>({
    url: `/cards/${cardId}`,
  });

export const useGetInfoCardDetail = (cardId: number) =>
  useSuspenseQuery({
    queryKey: ['get-info-card-detail', cardId],
    queryFn: async () => {
      const res = await getInfoCardDetail(cardId);

      return res.data;
    },
  });
