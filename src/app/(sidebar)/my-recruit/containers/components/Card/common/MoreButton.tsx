import { Icon } from '@/system/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';
import { color } from '@/system/token/color';

export function MoreButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Icon name="more" size={24} color={color.neutral40} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-[8px]">
          <Icon name="delete" color="#FF5C5C" />
          <div className="text-red-50 text-[15px] font-normal">삭제하기</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
