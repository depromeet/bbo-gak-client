import { Dropdown, Icon } from '@/system/components';
import { color } from '@/system/token/color';

interface MoreButtonProps {
  onDeleteClick: () => void;
  highlighted?: boolean;
}

export function MoreButton({ onDeleteClick, highlighted }: MoreButtonProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger className="outline-none">
        <Icon name="more" size={24} color={highlighted ? color.white : color.neutral40} />
      </Dropdown.Trigger>
      <Dropdown.Content className="mr-[100px]">
        <Dropdown.CheckedItem className="gap-[8px]" onClick={onDeleteClick}>
          <div className="flex items-center">
            <Icon name="delete" color="#FF5C5C" />
            <div className="text-red-50 text-[15px] font-normal">삭제하기</div>
          </div>
        </Dropdown.CheckedItem>
      </Dropdown.Content>
    </Dropdown>
  );
}
