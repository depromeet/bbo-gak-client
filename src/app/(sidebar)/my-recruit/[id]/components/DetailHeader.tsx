'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Button, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { useRef, useState } from 'react';
import { useGetRecruitById } from '../api/useGetRecruitById';
import { ApplicationStatus } from './ApplicationStatus';
import SemesterSelector from './SemesterSelector';
import TextBubble from './TextBubble';
import TitleInput from './TitleInput';

export default function DetailHeader({ recruitId }: { recruitId: string }) {
  const { data: recruitInfoById } = useGetRecruitById(recruitId);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLinked, setIsLinked] = useState(recruitInfoById?.siteUrl !== '');

  useOutsideClick(tooltipRef, () => setIsLinked(false));

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

  return (
    <div className="flex gap-[0.75rem] items-center">
      <SemesterSelector recruitId={recruitId} season={recruitInfoById?.season || ''} />
      <ApplicationStatus recruitId={recruitId} status={recruitInfoById?.recruitStatus || ''} />

      <TitleInput recruitId={recruitId} setIsFocused={setIsFocused} />

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
