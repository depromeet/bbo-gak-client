'use client';

import { useRef } from 'react';
import { EditorContent } from '@tiptap/react';
import { useEditor } from '../Editor/useEditor';
import { LinkMenu } from './extensions/menu/LinkMenu';
import { TextMenu } from '@/components/Editor/extensions/TextMenu';
import { ColumnsMenu } from '@/components/Editor/extensions/MultiColum/ColumnsMenu';
import { ImageBlockMenu } from '@/components/Editor/extensions/ImageBlock/ImageBlockMenu';
import '@/styles/editor.css';

export function Editor() {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <div style={{ scrollbarWidth: 'none' }} className="z-[-1] flex w-[660px] relative px-52" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
}
