import { useCallback, useState } from 'react';
import { usePutCardTitle } from '../api/usePutCardTitle/usePutCardTitle';
import { usePostCardTag } from '../api/usePostCardTag/usePostCardTag';
import { useDeleteCardTag } from '../api/useDeleteCardTag/useDeleteCardTag';
import { useCardDetailTagsContext } from '../fetcher/CardTagFetcher';
import { GetCardDetailTagsResponse } from '../api/useGetCardTags/useGetCardTags';

export function useWrite(id: number) {
  const { tags } = useCardDetailTagsContext();
  const [title, setTitle] = useState<string>('');

  // FIXME: 분류/태그 구분
  // 태그 중 역량 / 인성 태그 구분 필요
  const [selectedTags, setSelectedTags] = useState<GetCardDetailTagsResponse>(tags);
  const [selectedCategories, setSelectedCategories] = useState<GetCardDetailTagsResponse>(tags);

  const { mutate: mutatePutCardTitle } = usePutCardTitle(id);
  const { mutate: mutatePostCardTag } = usePostCardTag(id);
  const { mutate: mutateDeleteCardTag } = useDeleteCardTag(id);

  const handlePutCardTitle = useCallback((value: string) => {
    setTitle(value);
    mutatePutCardTitle(value);
  }, []);

  const handlePostCardTag = useCallback(
    (tag: any, type: 'category' | 'tag') => {
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
    (tag: any, type: 'category' | 'tag') => {
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
  };
}
