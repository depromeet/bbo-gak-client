'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Button, Dropdown, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { DueDateDialog } from '../../containers/components/DueDateDialog';
import { useDeleteRecruit } from '../api/useDeleteRecruit';
import { useGetRecruitById } from '../api/useGetRecruitById';
import { usePatchTitle } from '../api/usePatchTitle';
import { ApplicationStatus } from './ApplicationStatus';
import SemesterSelector from './SemesterSelector';
import TextBubble from './TextBubble';

export default function DetailHeader({ recruitId }: { recruitId: string }) {
  const { mutate: patchTitle } = usePatchTitle();
  const { data: recruitInfoById } = useGetRecruitById(recruitId);

  const { mutate: patchTitle } = usePatchTitle();
  const { data: recruitInfoById } = useGetRecruitById(recruitId);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>(recruitInfoById?.title || '');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLinked, setIsLinked] = useState<boolean>(false);
  useOutsideClick(tooltipRef, () => setIsLinked(false));

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetLink = () => {
    setIsLinked(true);
    setIsHovered(false);
  };

  const handleLinkChange = () => {
    setIsHovered((prev) => !prev);
  };

  const handleUpdateTitle = () => {
    setIsFocused(false);
    patchTitle({ newTitle: title, id: recruitId });
  };

  return (
    <div className="fixed top-0  w-full bg-white border-b-1 border-neutral-5 px-[80px] py-[24px]">
      <div className="flex justify-between items-center max-w-[1580px] mx-auto">
        <div className="flex gap-[0.75rem] items-center">
          <SemesterSelector recruitId={recruitId} season={recruitInfoById?.season || ''} />
          <ApplicationStatus recruitId={recruitId} status={recruitInfoById?.recruitStatus || ''} />
          <input
            className="pl-[6px] pr-[3px] px-[10px] rounded-[6px] text-neutral-95 text-heading1 font-bold border-none hover:bg-neutral-3 focus:outline-none focus:ring-2 focus:ring-mint-20 focus:ring-offset-2  focus:hover:bg-white"
            onChange={handleTitleChange}
            value={title}
            size={title.length}
            onFocus={() => setIsFocused(true)}
            onBlur={handleUpdateTitle}
          />

          <div ref={tooltipRef} className="relative">
            {!isFocused && (
              <Button
                className="flex justify-center items-center rounded-full hover:bg-neutral-1"
                aria-label={isLinked ? 'link button' : 'unlink button'}
                onMouseEnter={() => handleLinkChange()}>
                {/* onMouseLeave={() => handleLinkChange()}> */}
                <Icon name={isLinked ? 'link' : 'unlink'} size={16} color={isLinked ? color.mint40 : color.neutral40} />
              </Button>
            )}
            {isHovered && <TextBubble linkedOn={handleSetLink} recruitId={recruitId} />}
          </div>
        </div>
        <HeaderButtons recruitId={recruitId} />
      </div>
    </div>
  );
}

function HeaderButtons({ recruitId }: { recruitId: string }) {
  const { mutate: deleteRecruit } = useDeleteRecruit();
  const router = useRouter();

  const handleDeleteRecruit = () => {
    deleteRecruit(recruitId);
    router.push('/my-recruit');
  };

  return (
    <div className="flex items-center gap-[16px] mr-[50px]">
      <Dropdown>
        <Dropdown.Trigger asChild>
          <div
            className="p-[12px] rounded-[6px] hover:bg-neutral-3 border border-neutral-10"
            aria-label="calendarFill button">
            <Icon name="calendarFill" size={16} color={color.neutral95} />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content align="end">
          <Dropdown.CheckedItem className="gap-[8px]">
            <DueDateDialog />
          </Dropdown.CheckedItem>
        </Dropdown.Content>
      </Dropdown>

      {/* //TODO  DND 추가 */}
      <div
        className="p-[12px] rounded-[6px] hover:bg-neutral-3 border border-neutral-10 bg-white max-h-[42px]"
        aria-label="copy button">
        <Icon name="copy" size={16} color={color.neutral95} />
      </div>

      <Dropdown>
        <Dropdown.Trigger asChild>
          <div className="p-[12px] rounded-[6px]" aria-label="more button">
            <Icon name="more" color={color.neutral95} />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content align="end">
          <Dropdown.CheckedItem onClick={handleDeleteRecruit}>
            <div className="flex items-center gap-[8px]">
              <Icon name="delete" color="#FF5C5C" />
              <div className="text-red-50 text-[15px] font-normal">삭제하기</div>
            </div>
          </Dropdown.CheckedItem>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
