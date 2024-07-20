import { Icon } from '@/system/components';
import { Badge } from '@/app/(sidebar)/(my-info)/components/badge';
import { formatToYYMMDD } from '@/utils/date';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/ui/dropdown-menu';

// TODO: type 파일 분리
export interface Tag {
  id: number;
  name: string;
  type: '인성' | '역량';
}

export interface InfoCard {
  id: number;
  title: string;
  updatedDate: string;
  cardTagList: Tag[];
}

interface Props extends InfoCard {}

const tagTypeColor = {
  역량: 'blue',
  인성: 'purple',
} as const;

export function InfoCard({ title, updatedDate, cardTagList }: Props) {
  const formattedDate = formatToYYMMDD(updatedDate);

  return (
    <div className="flex flex-col justify-between min-w-[343px] h-[140px] p-[24px] rounded-[16px] bg-white border border-neutral-5 cursor-pointer hover:border-neutral-30">
      <div className="flex">
        <div className="flex-1 overflow-hidden">
          <div className="mb-[9px] text-[12px] text-neutral-20">{formattedDate}</div>
          <div className="w-auto truncate text-[16px] font-semibold">{title}</div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-[4px] hover:bg-neutral-1">
                <Icon name="more" color="#1B1C1E" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-[8px]">
                <Icon name="delete" color="#FF5C5C" />
                <div className="text-red-50 text-[15px] font-normal">삭제하기</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-[8px]">
                <Icon name="pip" color="#70737C" />
                <div className="text-neutral-95 text-[15px] font-normal">개별창으로 띄우기</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex gap-[8px]">
        {cardTagList.map((tag) => (
          <Badge key={tag.id} label={tag.name} variant={tagTypeColor[tag.type]} />
        ))}
      </div>
    </div>
  );
}
