import { useCallback, useId, useRef } from 'react';
import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import { Instance, sticky } from 'tippy.js';
import { Toolbar } from '../Toolbar/Toolbar';
import { EditorIcon } from '../EditorIcon/EditorIcon';
import type { MenuProps } from '../menu/LinkMenu';
import { getRenderContainer } from '../util/getRenderContainer';
import { ImageBlockWidth } from './ImageBlockWidth';

export function ImageBlockMenu({ editor, appendTo }: MenuProps): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);
  const id = useId();

  const getReferenceClientRect = useCallback(() => {
    return getRenderContainer(editor, 'node-imageBlock')?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('imageBlock');

    return isActive;
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('left').run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('center').run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('right').run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run();
    },
    [editor],
  );

  const imageWidth: string = editor.getAttributes('imageBlock').width;

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${id}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: () => {
          return appendTo?.current;
        },
        plugins: [sticky],
        sticky: 'popper',
      }}>
      <Toolbar.Wrapper shouldShowContent={shouldShow()} ref={menuRef}>
        <Toolbar.Button
          tooltip="Align image left"
          active={editor.isActive('imageBlock', { align: 'left' })}
          onClick={onAlignImageLeft}>
          <EditorIcon name="AlignHorizontalDistributeStart" />
        </Toolbar.Button>

        <Toolbar.Button
          tooltip="Align image center"
          active={editor.isActive('imageBlock', { align: 'center' })}
          onClick={onAlignImageCenter}>
          <EditorIcon name="AlignHorizontalDistributeCenter" />
        </Toolbar.Button>

        <Toolbar.Button
          tooltip="Align image right"
          active={editor.isActive('imageBlock', { align: 'right' })}
          onClick={onAlignImageRight}>
          <EditorIcon name="AlignHorizontalDistributeEnd" />
        </Toolbar.Button>

        <Toolbar.Divider />

        <ImageBlockWidth onChange={onWidthChange} value={Number(imageWidth.slice(0, imageWidth.length - 1))} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
}
