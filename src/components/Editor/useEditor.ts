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
      <blockquote>
        Nothing is impossible, the word itself says “I’m possible!”
      </blockquote>
      <p>Audrey Hepburn</p>
    `,
    immediatelyRender: false,
  });

  return { editor };
}
