'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Button, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { cn } from '@/utils';
import { ChangeEvent, useRef, useState } from 'react';
import { useGetRecruitById } from '../api/useGetRecruitById';
import { usePatchTitle } from '../api/usePatchTitle';
import { ApplicationStatus } from './ApplicationStatus';
import SemesterSelector from './SemesterSelector';
import TextBubble from './TextBubble';

export default function DetailHeader({ recruitId }: { recruitId: string }) {
  const { mutate: patchTitle } = usePatchTitle();
  const { data: recruitInfoById } = useGetRecruitById(recruitId);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(recruitInfoById?.title || '');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLinked, setIsLinked] = useState(false);

  useOutsideClick(tooltipRef, () => setIsLinked(false));

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetLink = () => {
    setIsLinked(true);
    setIsHovered(false);
  };
  let timeoutId: NodeJS.Timeout | null = null;

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  const handleUpdateTitle = () => {
    setIsFocused(false);
    patchTitle({ newTitle: title, id: recruitId });
  };

  return (
    <div className="flex gap-[0.75rem] items-center">
      <SemesterSelector recruitId={recruitId} season={recruitInfoById?.season || ''} />
      <ApplicationStatus recruitId={recruitId} status={recruitInfoById?.recruitStatus || ''} />
      <input
        className={cn(
          'pl-[6px] mr-[6px] rounded-[6px] text-neutral-95 text-heading1 font-bold border-none hover:bg-neutral-3 focus:outline-none focus:ring-2 focus:ring-mint-20 focus:ring-offset-2  focus:hover:bg-white',
        )}
        onChange={handleTitleChange}
        value={title}
        onFocus={() => setIsFocused(true)}
        onBlur={handleUpdateTitle}
      />

      <div ref={tooltipRef} className="relative">
        {!isFocused && (
          <Button
            className="flex justify-center items-center rounded-full hover:bg-neutral-1
    hover:transition-delay: 2s hover:block"
            aria-label={isLinked ? 'link button' : 'unlink button'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Icon name={isLinked ? 'link' : 'unlink'} size={16} color={isLinked ? color.mint40 : color.neutral40} />
          </Button>
        )}
        <TextBubble isHovered={isHovered} linkedOn={handleSetLink} recruitId={recruitId} />
      </div>
    </div>
  );
}
