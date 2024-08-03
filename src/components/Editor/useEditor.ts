import { useEditor as useTiptapEditor } from '@tiptap/react';
import { ExtensionKit } from './extensionKit';

export function useEditor() {
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
  });

  return { editor };
}
