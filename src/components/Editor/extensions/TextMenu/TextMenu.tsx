import { memo } from 'react';
import { Surface } from '../Surface/Surface';
import { BubbleMenu, Editor } from '@tiptap/react';
import { EditorIcon } from '../EditorIcon/EditorIcon';
import { Toolbar } from '../Toolbar/Toolbar';
import { ColorPicker } from '../pannel/ColorPicker/ColorPicker';
import { FontFamilyPicker } from '@/components/Editor/extensions/menu/FontFamilyPicker';
import { FontSizePicker } from '@/components/Editor/extensions/menu/FontSizePicker';
import { useTextmenuContentTypes } from './hooks/useTextMenuContentTypes';
import { ContentTypePicker } from './ContentTypePicker';
import { EditLinkPopover } from './EditLinkPopover';
import { useTextmenuStates } from '@/components/Editor/extensions/TextMenu/hooks/useTextMenuStates';
import { useTextmenuCommands } from './hooks/useTextMenuCommands';
import { Popover, PopoverContent, PopoverTrigger } from '@/system/components/Popover/Popover';

const MemoButton = memo(Toolbar.Button);
const MemoColorPicker = memo(ColorPicker);
const MemoContentTypePicker = memo(ContentTypePicker);
const MemoFontFamilyPicker = memo(FontFamilyPicker);
const MemoFontSizePicker = memo(FontSizePicker);

export type TextMenuProps = {
  editor: Editor;
};

export function TextMenu({ editor }: TextMenuProps) {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      className="py-16 px-8"
      tippyOptions={{ popperOptions: { placement: 'top-start' } }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}>
      <Toolbar.Wrapper className="relative">
        <Toolbar.Divider />
        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker onChange={commands.onSetFont} value={states.currentFont || ''} />
        <MemoFontSizePicker onChange={commands.onSetFontSize} value={states.currentSize || ''} />
        <Toolbar.Divider />
        <MemoButton
          className="w-34 h-32 border-none"
          tooltip="Bold"
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold}>
          <EditorIcon name="Bold" />
        </MemoButton>
        <MemoButton
          className="w-34 h-32 border-none"
          tooltip="Italic"
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic}>
          <EditorIcon name="Italic" />
        </MemoButton>
        <MemoButton
          className="w-34 h-32 border-none"
          tooltip="Underline"
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline}>
          <EditorIcon name="Underline" />
        </MemoButton>
        <MemoButton
          className="w-34 h-32 border-none"
          tooltip="Strikehrough"
          tooltipShortcut={['Mod', 'Shift', 'S']}
          onClick={commands.onStrike}
          active={states.isStrike}>
          <EditorIcon name="Strikethrough" />
        </MemoButton>
        <MemoButton
          className="w-34 h-32 border-none"
          tooltip="Code"
          tooltipShortcut={['Mod', 'E']}
          onClick={commands.onCode}
          active={states.isCode}>
          <EditorIcon name="Code" />
        </MemoButton>
        <MemoButton className="w-34 h-32 border-none" tooltip="Code block" onClick={commands.onCodeBlock}>
          <EditorIcon name="CodeXml" />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <Popover>
          <PopoverTrigger asChild>
            <MemoButton className="w-34 h-32 border-none" active={!!states.currentHighlight} tooltip="Highlight text">
              <EditorIcon name="Highlighter" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent side="top" sideOffset={8} asChild className="w-[300px]">
            <Surface className="p-4">
              <MemoColorPicker
                color={states.currentHighlight}
                onChange={commands.onChangeHighlight}
                onClear={commands.onClearHighlight}
              />
            </Surface>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <MemoButton className="w-34 h-32 border-none" active={!!states.currentColor} tooltip="Text color">
              <EditorIcon name="Palette" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent side="top" sideOffset={8} asChild className="w-[300px]">
            <Surface className="p-4">
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </PopoverContent>
        </Popover>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
}
