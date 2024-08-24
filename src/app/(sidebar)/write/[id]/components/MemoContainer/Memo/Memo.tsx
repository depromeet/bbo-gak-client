'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Textarea } from '@/system/components/Textarea/Textarea';
import { RemoveMemo } from '@/system/components/Icon/SVG/RemoveMemo';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { GetMemosResponse } from '../../../api/useGetMemos';
import { useMemosContext } from '../../../fetcher/MemosFetcher';
import { useDeleteMemo } from '../../../api/useDeleteMemo';
import { usePutMemo } from '@/app/(sidebar)/write/[id]/api/usesPutMemo';
import { If } from '@/system/utils/If';

export default function Memo({ id: memoId, content, updatedAt }: GetMemosResponse[number]) {
  const { cardId } = useMemosContext();
  const prevMemo = useRef<string>(content);
  const [memo, setMemo] = useState(content || '');
  const [showCloseButton, setShowCloseButton] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate } = useDeleteMemo(cardId);
  const { mutate: putMemo } = usePutMemo(cardId);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();

    if (prevMemo.current !== memo) {
      putMemo({ memoId, content: memo });
    }
  }, [memo]);

  return (
    <div
      // using pure css in memo.css
      className="memo-wrap"
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}>
      <div className="absolute bottom-27 w-360 z-[100] h-2 bg-white" />

      <div className="w-360 h-auto bg-white rounded-tl-8 rounded-tr-8 px-16 pt-16 pb-8">
        <Textarea
          ref={textareaRef}
          rows={1}
          className="w-full min-h-0 border-none p-0 memo-14 resize-none focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-0"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          autoFocus
        />
      </div>

      <AnimatePresence mode="wait">
        <If condition={showCloseButton}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute top-16 right-32"
            onClick={() => mutate(memoId)}>
            <RemoveMemo size={24} color="#37383C" />
          </motion.button>
        </If>
      </AnimatePresence>

      <div className="memo pl-16 memo-10 pb-16 memo-neutral-35">{updatedAt.split(' ')[0].replaceAll('-', '.')}</div>
    </div>
  );
}
