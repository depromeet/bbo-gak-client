'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { JSONContent } from '@tiptap/react';
import { useEditor } from '@/components/Editor/useEditor';
import { Editor } from '../Editor';
import type { StrictPropsWithChildren } from '@/types';

export function EditorProvider({
  children,
  readOnly = false,
  initialContent,
  contentSetter,
  setIsEditing,
  delay = 1000,
}: StrictPropsWithChildren<{
  readOnly?: boolean;
  initialContent?: JSONContent;
  contentSetter: (content: JSONContent) => void;
  delay?: number;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}>) {
  const { editor, content } = useEditor({ readOnly, initialContent, setIsEditing });

  useEffect(() => {
    const handle = setTimeout(() => {
      if (editor && content && !readOnly) {
        contentSetter(content);
        setIsEditing(false);
      }
    }, delay);

    return () => {
      clearTimeout(handle);
    };
  }, [content, contentSetter, delay]);

  return (
    <>
      {children}

      <div
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#DBDCDF' }}
        className="mx-auto h-[calc(100vh-264px)] overflow-x-hidden">
        <Editor editor={editor} />
      </div>
    </>
  );
}
