import { formatToYYMMDD } from '@/utils/date';
import { Icon } from '@/system/components';
import { Tag } from '@/system/components/index';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';
import { InfoCardType, TAG_TYPE_COLOR } from '@/types/info';
import { color } from '@/system/token/color';
import { If } from '@/system/utils/If';
import { useDeleteCard } from '@/app/(sidebar)/(my-info)/apis/useDeleteCard';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type InfoCardProps = InfoCardType;

export function InfoCard({ id, title, updatedDate, tagList }: InfoCardProps) {
  const formattedDate = formatToYYMMDD(updatedDate, { separator: '.' });

  const { mutate: deleteCard } = useDeleteCard();

  const handleDeleteCard: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();

    deleteCard(id);
  };

  return (
    <Link href={`/write/${id}`}>
      <div className="flex flex-col justify-between h-[140px] p-[24px] rounded-[16px] bg-white border border-neutral-5 cursor-pointer transition-colors ease-in-out hover:border-neutral-95 hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
        <div className="flex">
          <div className="flex-1 overflow-hidden">
            <div className="mb-[9px] text-[12px] text-neutral-20">{formattedDate}</div>
            <div className="w-auto truncate text-[16px] font-semibold">{title || '제목을 입력해주세요'}</div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full p-1 mt-[-2px] mr-[-10px] hover:bg-neutral-1" aria-label="more button">
                  <Icon name="more" color={color.neutral95} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-[8px]" onClick={handleDeleteCard}>
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
        <div className="flex gap-[8px]">
          {tagList.map(({ id, type, name }) => (
            <Tag key={id} color={TAG_TYPE_COLOR[type]}>
              {name}
            </Tag>
          ))}
        </div>
      </div>
      <If condition={tagList != null}>
        <div className="flex gap-[8px]">
          {tagList?.map(({ id, type, name }) => (
            <Tag key={id} color={TAG_TYPE_COLOR[type]}>
              {name}
            </Tag>
          ))}
        </div>
      </If>
    </Link>
  );
}