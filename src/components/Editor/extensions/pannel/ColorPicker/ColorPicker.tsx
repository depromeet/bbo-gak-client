import { HexColorPicker } from 'react-colorful';
import { ColorButton } from './ColorButton';
import { Toolbar } from '../../Toolbar/Toolbar';
import { EditorIcon } from '../../EditorIcon/EditorIcon';

export const themeColors = ['#fb7185', '#fdba74', '#d9f99d', '#a7f3d0', '#a5f3fc', '#a5b4fc'] as const;

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
};

export function ColorPicker({ color, onChange, onClear }: ColorPickerProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <HexColorPicker className="w-full" color={color || ''} onChange={onChange} />

      <div className="flex flex-wrap items-center gap-4 max-w-[15rem]">
        {themeColors.map((currentColor) => (
          <ColorButton
            active={currentColor === color}
            color={currentColor}
            key={currentColor}
            onColorChange={onChange}
          />
        ))}
        <Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
          <EditorIcon name="Undo" />
        </Toolbar.Button>
      </div>
    </div>
  );
}
