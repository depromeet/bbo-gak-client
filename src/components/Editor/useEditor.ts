import { JSONContent, useEditor as useTiptapEditor } from '@tiptap/react';
import { ExtensionKit } from './extensionKit';
import { useEffect, useState } from 'react';

export function useEditor({ readOnly, initialContent }: { initialContent?: JSONContent; readOnly?: boolean }) {
  const [content, setContent] = useState<JSONContent>(initialContent || {});

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
    content: `
      <p>뽀각에 오신 여러분을 환영해요 !</p>
    `,
    immediatelyRender: false,
    onUpdate: () => {
      const json = editor ? editor.getJSON() : {};
      setContent(json);
    },
  });

  useEffect(() => {
    if (editor && content && !readOnly) {
      editor.commands.setContent(content, false, { preserveWhitespace: 'full' });
    }
  }, [editor, content]);

  return { editor, content };
}
