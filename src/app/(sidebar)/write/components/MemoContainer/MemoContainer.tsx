import { Icon } from '@/system/components';
import { Textarea } from '@/system/components/Textarea/Textarea';
import { useState } from 'react';
import Memo from './Memo/Memo';
import { cn } from '@/utils';

const TEXT_DEFAULT_HEIGHT = 22;
const TEXT_FOCUS_HEIGHT = 80;

export default function MemoContainer() {
  const [memo, setMemo] = useState<string>('');
  const [textareaHeight, setTextareaHeight] = useState(TEXT_DEFAULT_HEIGHT);

  return (
    <section className="min-w-400 h-screen border-1 bg-neutral-1">
      <div className="flex items-end p-16 w-full h-109 gap-8">
        <Icon name="filledMemo" size={24} />
        <p className="text-18 font-semibold">메모</p>
      </div>

      <div className="w-full h-[calc(100vh-294px)] px-16 flex flex-col gap-16 overflow-y-scroll">
        <Memo />
      </div>

      <div className="max-w-400 relative px-16 pt-16 pb-24 h-185 flex flex-col justify-end">
        <div className="pt-13 px-16 pb-8 rounded-8 border-1 border-neutral-20 bg-white flex flex-col gap-4">
          <Textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            onFocus={() => setTextareaHeight(TEXT_FOCUS_HEIGHT)}
            onBlur={() => setTextareaHeight(TEXT_DEFAULT_HEIGHT)}
            rows={1}
            className={cn(
              'resize-none min-h-0 bg-white border-none focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              textareaHeight === TEXT_DEFAULT_HEIGHT && 'overflow-hidden',
            )}
            style={{ height: `${textareaHeight}px`, transition: 'height 0.2s ease-in-out' }}
            maxLength={130}
          />

          <div className="flex justify-between items-center w-full h-32">
            <p className="text-10 text-neutral-60">{memo.length} / 130</p>
            <Icon name="submitArrow" size={32} color="#1B1C1E" />
          </div>
        </div>
      </div>
    </section>
  );
}
