import { Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { isTextSelected } from '../util/isTextSelected';
import { Editor as CoreEditor } from '@tiptap/core';
import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';

export interface ShouldShowProps {
  editor?: CoreEditor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}

export function useTextmenuStates(editor: Editor) {
  const shouldShow = useCallback(
    ({ view }: ShouldShowProps) => {
      if (!view) {
        return false;
      }
      return isTextSelected({ editor });
    },
    [editor],
  );

  return {
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isStrike: editor.isActive('strike'),
    isUnderline: editor.isActive('underline'),
    isCode: editor.isActive('code'),
    isSubscript: editor.isActive('subscript'),
    isSuperscript: editor.isActive('superscript'),
    currentColor: editor.getAttributes('textStyle')?.color || undefined,
    currentHighlight: editor.getAttributes('highlight')?.color || undefined,
    currentFont: editor.getAttributes('textStyle')?.fontFamily || undefined,
    currentSize: editor.getAttributes('textStyle')?.fontSize || undefined,
    shouldShow,
  };
}
