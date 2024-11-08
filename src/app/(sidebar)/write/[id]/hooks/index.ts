import { useCallback, useMemo, useState } from 'react';
import { usePutCardTitle } from '../api/usePutCardTitle/usePutCardTitle';
import { usePostCardTag } from '../api/usePostCardTag/usePostCardTag';
import { useDeleteCardTag } from '../api/useDeleteCardTag/useDeleteCardTag';
import { useCardDetailTagsContext } from '../fetcher/CardTagFetcher';
import { GetCardDetailResponse } from '@/app/(sidebar)/write/[id]/api/useGetCardDetail/useGetCardDetail';
import { useTagsContext } from '../fetcher/TagsFetcher';
import { usePutCardType } from '@/app/(sidebar)/write/[id]/api/usePutCardType/usePutCardType';
import { useQueryClient } from '@tanstack/react-query';
import { TypeTag } from '@/types/info';
import { useDeleteCard } from '@/app/(sidebar)/(my-info)/apis/useDeleteCard';
import { useRouter } from 'next/navigation';
import { usePutCardContent } from '@/app/(sidebar)/write/[id]/api/usePutCardContent/usePutCardContent';

export function useWrite(id: number) {
  const {
    title: prevTitle,
    updatedDate,
    tagList,
    content,
    cardTypeValueList,
    cardTypeValueGroup,
    createdDate,
    recruitTitle,
  } = useCardDetailTagsContext();
  const { tags } = useTagsContext();
  const isMyInfo = cardTypeValueGroup === '내_정보';
  const disabledCount = isMyInfo ? 3 : 1;
  const queryClient = useQueryClient();

  const personalityTags = useMemo(() => tags.filter((tag) => tag.type === '인성'), [id]);
  const abilityTags = useMemo(() => tags.filter((tag) => tag.type === '역량'), [id]);
  const categoryTags = cardTypeValueList;

  const [title, setTitle] = useState<string>(prevTitle || '');
  const [selectedTags, setSelectedTags] = useState<GetCardDetailResponse['tagList']>(tagList);
  const [selectedCategories, setSelectedCategories] = useState<Array<TypeTag>>(categoryTags);

  const { mutate: mutatePutCardTitle } = usePutCardTitle(id);
  const { mutate: mutatePostCardTag } = usePostCardTag(id);
  const { mutate: mutateDeleteCardTag } = useDeleteCardTag(id);
  const { mutate: mutatePutCardType } = usePutCardType(id);
  const { mutate: deleteCard } = useDeleteCard();
  const { mutate: mutatePutCardContent, isPending, isSuccess } = usePutCardContent(id);
  const { back } = useRouter();

  const handlePutCardTitle = useCallback((value: string) => {
    setTitle(value);
    mutatePutCardTitle(value);
  }, []);

  const handlePutCardType = useCallback(
    (tag: TypeTag, method: 'put' | 'delete') => {
      if (method === 'put') {
        if (isMyInfo) {
          mutatePutCardType(
            { cardTypeValueList: [tag], cardTypeValueGroup },
            {
              onSuccess: async () => {
                setSelectedCategories([tag]);
                await queryClient.invalidateQueries({ queryKey: ['get-card-detail'] });
              },
            },
          );
          return;
        }

        mutatePutCardType(
          { cardTypeValueList: [...selectedCategories, tag], cardTypeValueGroup },
          {
            onSuccess: () => {
              setSelectedCategories([...selectedCategories, tag]);
            },
          },
        );
        return;
      }

      mutatePutCardType(
        { cardTypeValueList: selectedCategories.filter((value) => value !== tag), cardTypeValueGroup },
        {
          onSuccess: () => {
            setSelectedCategories((prev) => prev.filter((value) => value !== tag));
          },
        },
      );
    },
    [selectedCategories, isMyInfo],
  );

  const handlePostCardTag = useCallback((tag: GetCardDetailResponse['tagList'][number]) => {
    mutatePostCardTag(tag.id, {
      onSuccess: () => {
        setSelectedTags((prev) => [...prev, tag]);
      },
    });
  }, []);

  const handleDeleteCardTag = useCallback((tag: GetCardDetailResponse['tagList'][number]) => {
    mutateDeleteCardTag(tag.id, {
      onSuccess: () => {
        setSelectedTags((prev) => prev.filter((value) => value.id !== tag.id));
      },
    });
  }, []);

  return {
    handlePutCardTitle,
    handlePostCardTag,
    handleDeleteCardTag,
    handlePutCardType,
    deleteCard,
    title,
    selectedTags,
    selectedCategories,
    personalityTags,
    abilityTags,
    updatedDate: updatedDate.split(' ')[0].replaceAll(/-/g, '.'),
    content,
    disabledCount,
    createdDate: createdDate.split(' ')[0].replaceAll(/-/g, '.'),
    recruitTitle,
    back,
    mutatePutCardContent,
    isPending,
    isSuccess,
  };
}
