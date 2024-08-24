import { useCallback, useMemo, useState } from 'react';
import { usePutCardTitle } from '../api/usePutCardTitle/usePutCardTitle';
import { usePostCardTag } from '../api/usePostCardTag/usePostCardTag';
import { useDeleteCardTag } from '../api/useDeleteCardTag/useDeleteCardTag';
import { useCardDetailTagsContext } from '../fetcher/CardTagFetcher';
import { GetCardDetailResponse } from '@/app/(sidebar)/write/[id]/api/useGetCardDetail/useGetCardDetail';
import { useTagsContext } from '../fetcher/TagsFetcher';
import { usePostCardTitle } from '@/app/(sidebar)/write/[id]/api/usePostCategory/usePostCategory';

export function useWrite(id: number) {
  const { title: prevTitle, updatedDate, tagList, content, cardTypeValueList } = useCardDetailTagsContext();
  const { tags } = useTagsContext();

  const personalityTags = useMemo(() => tags.filter((tag) => tag.type === '인성'), [id]);
  const abilityTags = useMemo(() => tags.filter((tag) => tag.type === '역량'), [id]);

  const [title, setTitle] = useState<string>(prevTitle || '');
  const [selectedTags, setSelectedTags] = useState<GetCardDetailResponse['tagList']>(tagList);
  const [selectedCategory, setSelectedCategoy] = useState<string>(cardTypeValueList[0]);

  const { mutate: mutatePutCardTitle } = usePutCardTitle(id);
  const { mutate: mutatePostCardTag } = usePostCardTag(id);
  const { mutate: mutateDeleteCardTag } = useDeleteCardTag(id);
  const { mutate: mutatePostCardCategory } = usePostCardTitle(id);

  const handlePutCardTitle = useCallback((value: string) => {
    setTitle(value);
    mutatePutCardTitle(value);
  }, []);

  const handlePostCardCategory = useCallback((cateogry: string) => {
    mutatePostCardCategory([cateogry], {
      onSuccess: () => {
        setSelectedCategoy(cateogry);
      },
    });
  }, []);

  const handlePostCardTag = useCallback(
    (tag: GetCardDetailResponse['tagList'][number]) => {
      mutatePostCardTag(tag.id, {
        onSuccess: () => {
          setSelectedTags((prev) => [...prev, tag]);
        },
      });
    },
    [...selectedTags],
  );

  const handleDeleteCardTag = useCallback(
    (tag: GetCardDetailResponse['tagList'][0]) => {
      mutateDeleteCardTag(tag.id, {
        onSuccess: () => {
          setSelectedTags((prev) => prev.filter((value) => value.id !== tag.id));
        },
      });
    },
    [...selectedTags],
  );

  return {
    handlePutCardTitle,
    handlePostCardTag,
    handleDeleteCardTag,
    title,
    selectedTags,
    selectedCategory,
    personalityTags,
    abilityTags,
    updatedDate: updatedDate.split(' ')[0].replaceAll(/-/g, '.'),
    content,
    handlePostCardCategory,
  };
}
