import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import clsx from 'clsx';
import { useState } from 'react';

export default function TextBubble({ linkedOn }: { linkedOn: () => void }) {
  const [link, setLink] = useState<string>('');

  const handleLinkConfirm = () => {
    if (link) {
      linkedOn();
    }
  };

  return (
    <div className="absolute top-25 right-0 -left-98 inline-block bg-neutral-95 text-white text-sm py-2 px-4 rounded-md w-[210px]">
      <div className="flex items-center gap-2 px-[12px] py-[6px] bg-neutral-95 w-full">
        <input
          className="text-label1 font-regular bg-neutral-95 text-neutral-1 focus:outline-none focus:bg-neutral-95 focus:text-neutral-40"
          placeholder="공고 링크를 첨부해주세요"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={() => handleLinkConfirm()} className={clsx('mx-2 p-2', link && 'hover:bg-neutral-75')}>
          <Icon name="check" size={16} color={link ? color.white : 'opacity-100 '} />
        </button>
      </div>
      <div className="absolute w-[10px] top-0 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-gray-800" />
      </div>
    </div>
  );
}
