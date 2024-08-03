import { QueryOptions, useQuery } from '@tanstack/react-query';
import { http } from '../../../../apis/http';

interface GetCardListResponse {}

const getCardList = () => {
  return http.get<{ asd: string }>({ url: '' });
};

type BaseQueryOption = Omit<QueryOptions, 'queryKey' | 'queryFn'>;

const useAsd = (config: BaseQueryOption) => {
  return useQuery({ queryKey: [''], ...config });
};

useAsd({ gcTime: 1000 });
