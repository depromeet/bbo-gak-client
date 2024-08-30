import { JSONContent, useEditor as useTiptapEditor } from '@tiptap/react';
import { ExtensionKit } from './extensionKit';
import { useEffect, useState } from 'react';

export function useEditor({ readOnly, initialContent = {} }: { initialContent?: JSONContent; readOnly?: boolean }) {
  const [content, setContent] = useState<JSONContent>(JSON.parse((initialContent || JSON.stringify('')) as any) || {});

  const editor = useTiptapEditor({
    autofocus: true,
    extensions: [...ExtensionKit()],
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'min-h-full',
      },
    },

    immediatelyRender: false,
    onUpdate: () => {
      if (readOnly) {
        return;
      }
      const json = editor ? editor.getJSON() : {};
      setContent(json);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands?.setContent?.(content, false, { preserveWhitespace: 'full' });
    }
  }, [editor]);

  return { editor, content };
}
