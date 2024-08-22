import { formatToYYMMDD } from '@/utils/date';
import { Icon } from '@/system/components';
import { Tag, TagColor } from '@/system/components/index';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';
import { color } from '@/system/token/color';
import { InfoCardType, TagType } from '@/types/info';
import { If } from '@/system/utils/If';

type InfoCardProps = InfoCardType;

const TAG_TYPE_COLOR: Record<TagType['type'], TagColor> = {
  역량: 'blue',
  인성: 'purple',
};

export function InfoCard({ title, updatedDate, cardTagList }: InfoCardProps) {
  const formattedDate = formatToYYMMDD(updatedDate, { separator: '.' });

  return (
    <div className="flex flex-col justify-between h-[140px] p-[24px] rounded-[16px] bg-white border border-neutral-5 cursor-pointer hover:border-neutral-30">
      <div className="flex">
        <div className="flex-1 overflow-hidden">
          <div className="mb-[9px] text-[12px] text-neutral-20">{formattedDate}</div>
          <div className="w-auto truncate text-[16px] font-semibold">{title}</div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-[4px] hover:bg-neutral-1" aria-label="more button">
                <Icon name="more" color={color.neutral95} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-[8px]">
                <Icon name="delete" color="#FF5C5C" />
                <div className="text-red-50 text-[15px] font-normal">삭제하기</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-[8px]">
                <Icon name="pip" color={color.neutral50} />
                <div className="text-neutral-95 text-[15px] font-normal">개별창으로 띄우기</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <If condition={cardTagList != null}>
        <div className="flex gap-[8px]">
          {cardTagList?.map(({ id, type, name }) => (
            <Tag key={id} color={TAG_TYPE_COLOR[type]}>
              {name}
            </Tag>
          ))}
        </div>
      </If>
    </div>
  );
}
