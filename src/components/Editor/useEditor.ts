import { JSONContent, useEditor as useTiptapEditor } from '@tiptap/react';
import { ExtensionKit } from './extensionKit';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export function useEditor({
  readOnly = false,
  initialContent = {},
  setIsEditing,
}: {
  initialContent?: JSONContent | string;
  readOnly?: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  const [content, setContent] = useState<JSONContent>(() => {
    try {
      const parsedContent = initialContent
        ? JSON.parse(typeof initialContent === 'string' ? initialContent : JSON.stringify(initialContent))
        : '';

      return parsedContent || {};
    } catch (error) {
      return {};
    }
  });

  const editor = useTiptapEditor({
    editable: !readOnly,
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
    onUpdate: ({ editor }) => {
      if (readOnly) {
        return;
      }
      const json = editor ? editor.getJSON() : {};
      setContent(json);
      setIsEditing?.(true);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands?.setContent?.(content, false, { preserveWhitespace: 'full' });
    }
  }, [editor]);

  return { editor, content };
}
