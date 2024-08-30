'use client';

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
  const siteUrl = recruitInfoById?.siteUrl;

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSetLink = () => {
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
            className="flex justify-center items-center rounded-full hover:bg-neutral-1 hover:transition-delay: 2s hover:block"
            aria-label={siteUrl ? 'link button' : 'unlink button'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Icon name={siteUrl ? 'link' : 'unlink'} size={16} color={siteUrl ? color.mint40 : color.neutral40} />
          </Button>
        )}
        <TextBubble isHovered={isHovered} linkedOn={handleSetLink} recruitId={recruitId} />
      </div>
    </div>
  );
}
