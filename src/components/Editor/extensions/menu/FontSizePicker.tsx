import { useCallback } from 'react';
import { DropdownButton } from '@/components/Editor/extensions/EditorDropdown/Dropdown';
import { EditorIcon } from '@/components/Editor/extensions/EditorIcon/EditorIcon';
import { Surface } from '@/components/Editor/extensions/Surface/Surface';
import { Toolbar } from '@/components/Editor/extensions/Toolbar/Toolbar';
import { Dropdown } from '@/system/components';

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '16px' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' },
] as const;

export type FontSizePickerProps = {
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  value: string;
};

export function FontSizePicker({ onChange, value }: FontSizePickerProps) {
  const currentValue = FONT_SIZES.find((size) => size.value === value);
  const currentSizeLabel = currentValue?.label.split(' ')[0] || 'Medium';

  const selectSize = useCallback((size: string) => () => onChange(size), [onChange]);

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Toolbar.Button className="w-82 h-35 border-none" active={!!currentValue?.value}>
          {currentSizeLabel}
          <EditorIcon name="ChevronDown" className="w-8 h-8" />
        </Toolbar.Button>
      </Dropdown.Trigger>

      <Dropdown.Content asChild>
        <Surface className="flex flex-col gap-4 px-8 py-16">
          {FONT_SIZES.map((size) => (
            <DropdownButton
              className="hover:bg-neutral-5"
              isActive={value === size.value}
              onClick={selectSize(size.value)}
              key={`${size.label}_${size.value}`}>
              <span style={{ fontSize: size.value }}>{size.label}</span>
            </DropdownButton>
          ))}
        </Surface>
      </Dropdown.Content>
    </Dropdown>
  );
}
