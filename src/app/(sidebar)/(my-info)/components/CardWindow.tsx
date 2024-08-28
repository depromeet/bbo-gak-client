'use client';

import { TouchButton } from '@/components/TouchButton';
import { Icon, Tag } from '@/system/components';
import { color } from '@/system/token/color';
import { cn } from '@/utils';
import { useState } from 'react';
import { GetInfoCardDetailResponse, useGetInfoCardDetail } from '../apis/useGetInfoCardDetail';
import { Spacing } from '@/system/utils/Spacing';
import { formatToYYMMDD } from '@/utils/date';

const mockData: GetInfoCardDetailResponse = {
  title: '제목입니다제목입니다제목입니다제목입니다제목입니다',
  content: '반갑습니다',
  updatedDate: '2024-07-24 21:22:08',
  cardTypeValueList: ['자기소개서'],
  tagList: [
    {
      id: 1,
      name: '스프링',
      type: '역량',
    },
    {
      id: 2,
      name: '리액트',
      type: '역량',
    },
  ],
};

interface CardWindowProps {
  cardId: number;
}

export function CardWindow({ cardId }: CardWindowProps) {
  const [isRight, setisRight] = useState(true);

  // const {} = useGetInfoCardDetail(cardId);

  const { title, content, updatedDate, cardTypeValueList, tagList } = mockData;

  return (
    <div
      className={cn(
        `absolute bottom-16 w-368 h-[768px] rounded-20 bg-white shadow-[0px_3px_8px_0px_rgba(0,0,0,0.24)]`,
        isRight ? 'right-16' : 'left-16',
      )}>
      <div className="p-20 pb-24">
        <div className="flex justify-between">
          <div className="flex gap-12">
            <TouchButton className="p-2 border rounded-[3.8px]">
              <Icon name="fullScreenCorner" color={color.neutral35} size={20} />
            </TouchButton>
            <TouchButton
              className={cn('p-2 border rounded-[3.8px]', !isRight && '[&>svg]:rotate-180')}
              onClick={() => setisRight((prev) => !prev)}>
              <Icon name="toLeft" color={color.neutral35} size={20} />
            </TouchButton>
          </div>
          <Icon name="x" color="#878A93" />
        </div>
        <Spacing size={20} />
        <div className="flex items-center">
          <h1 className="flex-1 text-heading1 font-bold text-neutral-95 truncate">{title}</h1>
          <p className="text-caption1 font-medium text-neutral-20">{formatToYYMMDD(updatedDate, { separator: '.' })}</p>
        </div>
        <Spacing size={24} />
        <div className="flex gap-8">
          {cardTypeValueList.map((type) => (
            <Tag key={type} color="yellow">
              {type.replaceAll('_', ' ')}
            </Tag>
          ))}
          {tagList.map(({ id, name, type }) => (
            <Tag key={id} color={type === '역량' ? 'blue' : 'purple'}>
              {name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
