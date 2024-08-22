import { useCallback, useState } from 'react';
import { usePutCardContent } from '../api/usePutCardContent/usePutCardContent';
import { usePutCardTitle } from '../api/usePutCardTitle/usePutCardTitle';
import { usePostCardTag } from '../api/usePostCardTag/usePostCardTag';
import { useDeleteCardTag } from '../api/useDeleteCardTag/useDeleteCardTag';
import { tags, categories } from '@/app/(sidebar)/write/[id]/TagSelector/constants';
import { useEditor } from '@/components/Editor/useEditor';

export function useWrite(id: number) {
  const [title, setTitle] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Array<(typeof tags)[number] & { id: number }>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<(typeof categories)[number] & { id: number }>>([]);
  const { editor } = useEditor();

  const { mutate: mutatePutCardContent } = usePutCardContent(id);
  const { mutate: mutatePutCardTitle } = usePutCardTitle(id);
  const { mutate: mutatePostCardTag } = usePostCardTag(id);
  const { mutate: mutateDeleteCardTag } = useDeleteCardTag(id);

  const handleCardContent = useCallback(() => {
    if (editor?.getJSON()) {
      mutatePutCardContent(editor?.getJSON());
    }
  }, [editor?.getJSON()]);

  const handlePutCardTitle = useCallback((value: string) => {
    setTitle(value);
    mutatePutCardTitle(title);
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
    editor,
    handleCardContent,
  };
}
