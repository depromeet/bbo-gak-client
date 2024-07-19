import { Icon } from '@/system/components';
import { Badge } from '@/app/(sidebar)/(my-info)/components/badge';
import { formatToYYMMDD } from '@/utils/date';

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
    <div className="flex flex-col justify-between min-w-[343px] h-[140px] p-[24px] rounded-[16px] bg-white border border-neutral-5">
      <div className="flex">
        <div className="flex-1 overflow-hidden">
          <div className="mb-[9px] text-[12px] text-neutral-20">{formattedDate}</div>
          <div className="w-auto truncate text-[16px] font-semibold">{title}</div>
        </div>
        <div>
          <button>
            <Icon name="more" color="#1B1C1E" />
          </button>
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
