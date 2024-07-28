import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownButton, DropdownCategoryTitle } from '@/components/Editor/extensions/EditorDropdown/Dropdown';
import { EditorIcon } from '@/components/Editor/extensions/EditorIcon/EditorIcon';
import { Surface } from '@/components/Editor/extensions/Surface/Surface';
import { Toolbar } from '@/components/Editor/extensions/Toolbar/Toolbar';
import { useCallback } from 'react';

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
] as const;

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [group.options]).flat();

export type FontFamilyPickerProps = {
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  value: string;
};

export function FontFamilyPicker({ onChange, value }: FontFamilyPickerProps) {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value);
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter';

  const selectFont = useCallback((font: string) => () => onChange(font), [onChange]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toolbar.Button className="w-62 h-32 border-none" active={!!currentValue?.value}>
          {currentFontLabel}
          <EditorIcon name="ChevronDown" className="w-8 h-8" />
        </Toolbar.Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent asChild>
        <Surface className="flex flex-col gap-4 px-8 py-16">
          {FONT_FAMILY_GROUPS.map(({ label, options }) => (
            <div key={label} className="flex flex-col font-semibold text-10 ">
              <DropdownCategoryTitle>{label}</DropdownCategoryTitle>
              {options.map(({ label, value }) => (
                <DropdownButton
                  className="hover:bg-neutral-5"
                  key={`${label}_${value}`}
                  isActive={value === value}
                  onClick={selectFont(value)}>
                  <span style={{ fontFamily: value }}>{label}</span>
                </DropdownButton>
              ))}
            </div>
          ))}
        </Surface>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
