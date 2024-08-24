import { useCallback, useMemo, useState } from 'react';
import { usePutCardTitle } from '../api/usePutCardTitle/usePutCardTitle';
import { usePostCardTag } from '../api/usePostCardTag/usePostCardTag';
import { useDeleteCardTag } from '../api/useDeleteCardTag/useDeleteCardTag';
import { useCardDetailTagsContext } from '../fetcher/CardTagFetcher';
import { GetCardDetailResponse } from '@/app/(sidebar)/write/[id]/api/useGetCardDetail/useGetCardDetail';
import { useTagsContext } from '../fetcher/TagsFetcher';

export function useWrite(id: number) {
  const { title: prevTitle, updatedDate, tagList, content } = useCardDetailTagsContext();
  const { tags } = useTagsContext();

  const personalityTags = useMemo(() => tags.filter((tag) => tag.type === '인성'), [id]);
  const abilityTags = useMemo(() => tags.filter((tag) => tag.type === '역량'), [id]);
  const categoryTags = useMemo(() => tags.filter((tag) => tag.type === '분류'), [id]);

  const [title, setTitle] = useState<string>(prevTitle || '');
  const [selectedTags, setSelectedTags] = useState<GetCardDetailResponse['tagList']>(tagList);
  const [selectedCategories, setSelectedCategories] = useState<GetCardDetailResponse['tagList']>(categoryTags);

  const { mutate: mutatePutCardTitle } = usePutCardTitle(id);
  const { mutate: mutatePostCardTag } = usePostCardTag(id);
  const { mutate: mutateDeleteCardTag } = useDeleteCardTag(id);

  const handlePutCardTitle = useCallback((value: string) => {
    setTitle(value);
    mutatePutCardTitle(value);
  }, []);

  const handlePostCardTag = useCallback(
    (tag: GetCardDetailResponse['tagList'][number], type: 'category' | 'tag') => {
      mutatePostCardTag(tag.id, {
        onSuccess: () => {
          if (type === 'category') {
            setSelectedCategories((prev) => [...prev, tag]);
            return;
          }
          setSelectedTags((prev) => [...prev, tag]);
        },
      });
    },
    [...selectedCategories, ...selectedTags],
  );

  const handleDeleteCardTag = useCallback(
    (tag: GetCardDetailResponse['tagList'][0], type: 'category' | 'tag') => {
      mutateDeleteCardTag(tag.id, {
        onSuccess: () => {
          if (type === 'category') {
            setSelectedCategories((prev) => prev.filter((value) => value.id !== tag.id));
            return;
          }
          setSelectedTags((prev) => prev.filter((value) => value.id !== tag.id));
        },
      });
    },
    [...selectedCategories, ...selectedTags],
  );

  return {
    handlePutCardTitle,
    handlePostCardTag,
    handleDeleteCardTag,
    title,
    selectedTags,
    selectedCategories,
    personalityTags,
    abilityTags,
    categoryTags,
    updatedDate: updatedDate.split(' ')[0].replaceAll(/-/g, '.'),
    content,
  };
}
