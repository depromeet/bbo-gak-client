import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle, Fragment } from 'react';
import { Command, MenuListProps } from './types';
import { Surface } from '../Surface/Surface';
import { DropdownButton } from '../EditorDropdown/Dropdown';
import { EditorIcon } from '../EditorIcon/EditorIcon';

export const MenuList = forwardRef((props: MenuListProps, ref) => {
  const { items } = props;
  const scrollContainer = useRef<HTMLDivElement>(null);
  const activeItem = useRef<HTMLButtonElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState<number>(0);

  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = items[groupIndex].commands[commandIndex];
      props.command(command);
    },
    [props],
  );

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowDown') {
        if (!items.length) {
          return false;
        }

        const commands = items[selectedGroupIndex].commands;
        let newCommandIndex = selectedCommandIndex + 1;
        let newGroupIndex = selectedGroupIndex;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex + 1;
        }

        if (items.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === 'ArrowUp') {
        if (!items.length) {
          return false;
        }

        let newCommandIndex = selectedCommandIndex - 1;
        let newGroupIndex = selectedGroupIndex;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1;
          newCommandIndex = items[newGroupIndex]?.commands.length - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = items.length - 1;
          newCommandIndex = items[newGroupIndex].commands.length - 1;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === 'Enter') {
        if (!items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }
      return false;
    },
  }));

  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop;
      const offsetHeight = activeItem.current.offsetHeight;

      scrollContainer.current.scrollTop = offsetTop - offsetHeight;
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => () => {
      selectItem(groupIndex, commandIndex);
    },
    [selectItem],
  );

  if (!items.length) {
    return null;
  }

  return (
    <Surface ref={scrollContainer} className="text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-32 p-8">
      <div className="grid grid-cols-1 gap-2">
        {items.map(({ title, commands }, groupIndex: number) => (
          <Fragment key={`${title}-wrapper`}>
            <div
              className="text-neutral-500 text-[0.65rem] col-[1/-1] mx-8 mt-16 font-semibold tracking-wider select-none uppercase first:mt-2"
              key={title}>
              {title}
            </div>

            {commands.map(({ label, iconName }: Command, commandIndex: number) => (
              <DropdownButton
                key={label}
                isActive={selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex}
                onClick={createCommandClickHandler(groupIndex, commandIndex)}
                className="hover:bg-neutral-10">
                <EditorIcon name={iconName} className="mr-24" />

                {label}
              </DropdownButton>
            ))}
          </Fragment>
        ))}
      </div>
    </Surface>
  );
});

MenuList.displayName = 'MenuList';
