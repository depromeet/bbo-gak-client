'use client';

import { useEffect, useState } from 'react';
import { usePutCardContent } from '@/app/(sidebar)/write/[id]/api/usePutCardContent/usePutCardContent';
import { useEditor } from '@/components/Editor/useEditor';
import { StrictPropsWithChildren } from '@/types';
import { Editor } from '../Editor';

export function EditorProvider({
  cardId,
  children,
  readOnly = false,
}: StrictPropsWithChildren<{ cardId: number; readOnly?: boolean }>) {
  const { editor, content } = useEditor({ readOnly });
  const { mutate: mutatePutCardContent } = usePutCardContent(cardId);

  // TODO: debounce
  useEffect(() => {
    if (editor && content && !readOnly) {
      mutatePutCardContent(content);
    }
  }, [content]);

  return (
    <>
      {children}

      <div
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#DBDCDF' }}
        className="px-80 h-[calc(100vh-264px)] overflow-x-hidden">
        <Editor editor={editor} />
      </div>
    </>
  );
}
