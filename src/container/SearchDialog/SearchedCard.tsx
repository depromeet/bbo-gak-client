import { format } from 'date-fns';
import { generateText } from '@tiptap/core';
import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';
import { SearchedCardType } from './types';
import { Spacing } from '@/system/utils/Spacing';
import { Tag } from './Tag';
import { If } from '@/system/utils/If';
import { SwitchCase } from '@/system/utils/SwitchCase';

interface Props extends SearchedCardType {
  onCardClick?: () => void;
}

export function SearchedCard({
  id,
  title,
  updatedDate,
  tagList,
  cardTypeValueGroup,
  cardTypeValue,
  recruitTitle,
  content,
  onCardClick,
}: Props) {
  const value = content === '' ? '' : generateText(JSON.parse(content), [StarterKit, Text]);

  return (
    <div className="rounded-[16px] border-[1px] border-neutral-5" onClick={onCardClick}>
      <div className="bg-neutral-1 px-[23px] pt-[12px] pb-[10px] border-neutral-5 border-b-[1px] flex justify-between items-center">
        <div>
          {cardTypeValueGroup} / {cardTypeValue}
        </div>
        <span className="text-neutral-30 text-caption1">{format(new Date(updatedDate), 'yy.MM.dd')}</span>
      </div>
      <div className="px-[23px] pt-[18px] pb-[22px]">
        <div>
          <SwitchCase
            value={recruitTitle == null ? 'spacing' : 'badge'}
            caseBy={{
              spacing: <Spacing size={24} />,
              badge: (
                <span className="text-caption1 px-[6px] py-[3px] rounded-[4px] bg-[#FFF3C2] text-[#D77B0F]">
                  {recruitTitle}
                </span>
              ),
            }}
          />
        </div>
        <Spacing size={16} />
        <span className="text-neutral-95 text-body1 font-semibold text-ellipsis">{title || '제목을 입력해주세요'}</span>
        <Spacing size={8} />
        <span className="text-ellipsis text-caption1 text-neutral-35 line-clamp-2 h-[32px]">{value}</span>
        <Spacing size={16} />
        <div className="flex gap-[8px] flex-wrap">
          {tagList.slice(0, 3).map((tag) => (
            <Tag key={tag.id} variant={tag.type}>
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
