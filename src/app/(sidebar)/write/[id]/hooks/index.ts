import { useCallback, useMemo, useState } from 'react';
import { usePutCardTitle } from '../api/usePutCardTitle/usePutCardTitle';
import { usePostCardTag } from '../api/usePostCardTag/usePostCardTag';
import { useDeleteCardTag } from '../api/useDeleteCardTag/useDeleteCardTag';
import { useCardDetailTagsContext } from '../fetcher/CardTagFetcher';
import { GetCardDetailResponse } from '@/app/(sidebar)/write/[id]/api/useGetCardDetail/useGetCardDetail';
import { useTagsContext } from '../fetcher/TagsFetcher';
import { usePutCardType, PutCardTypeRequest } from '@/app/(sidebar)/write/[id]/api/usePutCardType/usePutCardType';
import { InfoType } from '@/types';

export function useWrite(id: number) {
  const {
    title: prevTitle,
    updatedDate,
    tagList,
    content,
    cardTypeValueList,
    cardTypeValueGroup,
  } = useCardDetailTagsContext();
  const { tags } = useTagsContext();
  const disabledCount = cardTypeValueGroup === '내_정보' ? 3 : 1;

  const personalityTags = useMemo(() => tags.filter((tag) => tag.type === '인성'), [id]);
  const abilityTags = useMemo(() => tags.filter((tag) => tag.type === '역량'), [id]);
  const categoryTags = cardTypeValueList;

  const [title, setTitle] = useState<string>(prevTitle || '');
  const [selectedTags, setSelectedTags] = useState<GetCardDetailResponse['tagList']>(tagList);
  const [selectedCategories, setSelectedCategories] = useState<PutCardTypeRequest['cardTypeValueList']>(categoryTags);

  const { mutate: mutatePutCardTitle } = usePutCardTitle(id);
  const { mutate: mutatePostCardTag } = usePostCardTag(id);
  const { mutate: mutateDeleteCardTag } = useDeleteCardTag(id);
  const { mutate: mutatePutCardType } = usePutCardType(id);

  const handlePutCardTitle = useCallback((value: string) => {
    setTitle(value);
    mutatePutCardTitle(value);
  }, []);

  const handlePutCardType = useCallback(
    (tag: InfoType, method: 'put' | 'delete') => {
      if (method === 'put') {
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
    [selectedCategories],
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
    title,
    selectedTags,
    selectedCategories,
    personalityTags,
    abilityTags,
    categoryTags,
    updatedDate: updatedDate.split(' ')[0].replaceAll(/-/g, '.'),
    content,
    disabledCount,
  };
}
