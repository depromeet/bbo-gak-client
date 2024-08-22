'use client';

import { useEffect } from 'react';
import { usePutCardContent } from '@/app/(sidebar)/write/[id]/api/usePutCardContent/usePutCardContent';
import { useEditor } from '@/components/Editor/useEditor';
import { StrictPropsWithChildren } from '@/types';
import { Editor } from '../Editor';

export function EditorProvider({
  cardId,
  children,
  readOnly = false,
}: StrictPropsWithChildren<{ cardId: number; readOnly?: boolean }>) {
  const { editor } = useEditor();
  const { mutate: mutatePutCardContent } = usePutCardContent(cardId);

  // TODO: debounce
  useEffect(() => {
    if (editor?.getJSON() && !readOnly) {
      mutatePutCardContent(editor.getJSON());
    }
  }, [editor?.getJSON(), readOnly]);

  return (
    <>
      {children}
      <Editor editor={editor} />
    </>
  );
}
