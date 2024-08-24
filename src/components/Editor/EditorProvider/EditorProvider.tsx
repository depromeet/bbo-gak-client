'use client';

import { useEffect } from 'react';
import { JSONContent } from '@tiptap/react';
import { usePutCardContent } from '@/app/(sidebar)/write/[id]/api/usePutCardContent/usePutCardContent';
import { useEditor } from '@/components/Editor/useEditor';
import { StrictPropsWithChildren } from '@/types';
import { Editor } from '../Editor';

export function EditorProvider({
  cardId,
  children,
  readOnly = false,
  initialContent,
}: StrictPropsWithChildren<{ cardId: number; readOnly?: boolean; initialContent?: JSONContent }>) {
  const { editor, content } = useEditor({ readOnly, initialContent });
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
