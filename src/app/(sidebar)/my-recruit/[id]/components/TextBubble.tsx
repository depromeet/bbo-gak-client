import { Icon } from '@/system/components';
import { cn } from '@/utils';
import { useEffect, useState } from 'react';
import { useGetRecruitById } from '../api/useGetRecruitById';
import { usePatchSiteUrl } from '../api/usePatchSiteUrl';

export default function TextBubble({
  linkedOn,
  recruitId,
  isHovered,
}: {
  linkedOn: () => void;
  recruitId: string;
  isHovered: boolean;
}) {
  const { data: recruitInfoById } = useGetRecruitById(recruitId);
  const { mutate: newLink } = usePatchSiteUrl();

  const [link, setLink] = useState('');
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    if (recruitInfoById?.siteUrl) {
      setLink(recruitInfoById.siteUrl);
      setIsLinked(true);
    } else {
      setLink('');
      setIsLinked(false);
    }
  }, [recruitInfoById]);

  const handleLinkConfirm = () => {
    if (link) {
      newLink({ newSiteUrl: link, id: recruitId });
      linkedOn();
    }
  };

  const handleDeleteLink = () => {
    setLink('');
    newLink({ newSiteUrl: '', id: recruitId });
  };

  return (
    <div
      className={cn(
        'absolute top-25 right-0 -left-98 bg-neutral-95 text-white text-sm py-2 px-2 rounded-md max-w-[225px]  min-w-[210px] transition-opacity duration-2000 hover:opacity-100',
        isHovered ? 'opacity-100' : 'opacity-0',
      )}>
      <div className="flex items-center justify-between gap-[4px] px-[12px] py-[6px] bg-neutral-95">
        <Icon name="link" size={16} />
        {isLinked ? (
          <>
            <a
              href={`https://${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label1 font-regular border-b-1 text-neutral-1 focus:outline-none focus:bg-neutral-95 focus:text-neutral-40 text-underlined max-w-[158px] truncate">
              {link}
            </a>
            <button onClick={handleDeleteLink} className={cn('mx-2 px-2 rounded-[2px]', 'hover:bg-neutral-75')}>
              삭제
            </button>
          </>
        ) : (
          <>
            <input
              className="text-label1 font-regular bg-neutral-95 text-neutral-1 focus:bg-neutral-95 focus:text-neutral-40 "
              placeholder="공고 링크를 첨부해주세요"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button onClick={handleLinkConfirm} className={cn('mx-2 p-2 bg-neutral-95', link && 'hover:bg-neutral-75')}>
              <Icon name="check" size={16} color={link ? 'white' : 'opacity-100'} />
            </button>
          </>
        )}
      </div>
      <div className="absolute w-[10px] top-0 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-gray-800" />
      </div>
    </div>
  );
}
