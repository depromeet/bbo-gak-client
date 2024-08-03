import { useMemo } from 'react';
import { icons } from 'lucide-react';
import { Surface } from '@/components/Editor/extensions/Surface/Surface';
import { EditorIcon } from '@/components/Editor/extensions/EditorIcon/EditorIcon';
import { DropdownButton, DropdownCategoryTitle } from '@/components/Editor/extensions/EditorDropdown/Dropdown';
import { Toolbar } from '@/components/Editor/extensions/Toolbar/Toolbar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/system/components/DropdownMenu/DropdownMenu';

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: 'option';
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: 'category';
};

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
  option.type === 'option';

export function ContentTypePicker({ options }: ContentTypePickerProps) {
  const activeItem = useMemo(() => options.find((option) => option.type === 'option' && option.isActive()), [options]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toolbar.Button className="w-46 h-32 border-none" active={activeItem?.id !== 'paragraph' && !!activeItem?.type}>
          <EditorIcon name={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} />
          <EditorIcon name="ChevronDown" className="w-8 h-8" />
        </Toolbar.Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent asChild>
        <Surface className="flex flex-col gap-1 px-8 py-16">
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <DropdownButton
                  className="hover:bg-neutral-5"
                  key={option.id}
                  onClick={option.onClick}
                  isActive={option.isActive()}>
                  <EditorIcon name={option.icon} className="w-16 h-16 mr-4" />
                  {option.label}
                </DropdownButton>
              );
            }
            return (
              <div className="mt-8 first:mt-0" key={option.id}>
                <DropdownCategoryTitle key={option.id}>{option.label}</DropdownCategoryTitle>
              </div>
            );
          })}
        </Surface>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
