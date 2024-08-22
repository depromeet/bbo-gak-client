import { useCallback, useState } from 'react';
import { usePutCardContent } from '../api/usePutCardContent/usePutCardContent';
import { usePutCardTitle } from '../api/usePutCardTitle/usePutCardTitle';
import { usePostCardTag } from '../api/usePostCardTag/usePostCardTag';
import { useDeleteCardTag } from '../api/useDeleteCardTag/useDeleteCardTag';
import { useDebounce } from '@/hooks/useDebounce';
import { tags, categories } from '@/app/(sidebar)/write/[id]/TagSelector/constants';
import { useEditor } from '@/components/Editor/useEditor';

export function useWrite(id: number) {
  const [title, setTitle] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<typeof tags>([]);
  const [selectedCategories, setSelectedCategories] = useState<typeof categories>([]);
  const { editor } = useEditor();

  const { mutate: mutatePutCardContent } = usePutCardContent(id);
  const { mutate: mutatePutCardTitle } = usePutCardTitle(id);
  const { mutate: mutatePostCardTag } = usePostCardTag(id);
  const { mutate: mutateDeleteCardTag } = useDeleteCardTag(id);

  useDebounce(
    useCallback(() => mutatePutCardContent(editor?.getJSON()!), []),
    1000,
    [editor?.getJSON()],
  );

  const handlePutCardTitle = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handlePostCardTag = useCallback(
    (tagId: number) => {
      useDebounce(() => mutatePostCardTag(tagId), 1000, [...selectedCategories, ...selectedTags]);
    },
    [...selectedCategories, ...selectedTags],
  );

  const handleDeleteCardTag = useCallback(
    (tagId: number) => {
      useDebounce(() => mutateDeleteCardTag(tagId), 1000, [...selectedCategories, ...selectedTags]);
    },
    [...selectedCategories, ...selectedTags],
  );

  return {
    handlePutCardTitle,
    handlePostCardTag,
    handleDeleteCardTag,
    title,
    setTitle,
    selectedTags,
    setSelectedTags,
    selectedCategories,
    setSelectedCategories,
    editor,
  };
}
