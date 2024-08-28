import { cn } from '@/utils';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RecruitByIdType } from '../api/useGetRecruitById';
import { usePatchTitle } from '../api/usePatchTitle';

interface TitleInputProps {
  recruitInfoById: RecruitByIdType;
  recruitId: string;
  setIsFocused: (value: boolean) => void;
}

export default function TitleInput({ recruitInfoById, recruitId, setIsFocused }: TitleInputProps) {
  const { mutate: patchTitle } = usePatchTitle();
  const [title, setTitle] = useState(recruitInfoById?.title || '');
  const titleRef = useRef<HTMLSpanElement>(null);

  const [titleWidth, setTitleWidth] = useState(titleRef?.current?.clientWidth);

  useEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth);
    }
  }, [title]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleWidth(titleRef?.current?.clientWidth);
  };

  const handleUpdateTitle = () => {
    setIsFocused(false);
    patchTitle({ newTitle: title, id: recruitId });
  };

  return (
    <>
      <input
        className={cn(
          'pl-[6px] mr-[6px] rounded-[6px] text-neutral-95 text-heading1 font-bold border-none bg-white hover:bg-neutral-3 focus:outline-none focus:ring-2 focus:ring-mint-20 focus:ring-offset-2  focus:hover:bg-white',
        )}
        style={{ width: `${titleWidth}px` }}
        onChange={handleTitleChange}
        value={title}
        onFocus={() => setIsFocused(true)}
        onBlur={handleUpdateTitle}
      />
      <span
        ref={titleRef}
        className={cn(
          'absolute opacity-0 pointer-events-none px-[6px] mr-[6px] rounded-[6px] text-neutral-95 text-heading1 font-bold border-none hover:bg-neutral-3 focus:outline-none focus:ring-2 focus:ring-mint-20 focus:ring-offset-2 focus:hover:bg-white',
        )}>
        {title}
      </span>
    </>
  );
}
