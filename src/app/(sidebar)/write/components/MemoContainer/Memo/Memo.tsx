'use client';

import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/system/components/Textarea/Textarea';
import { RemoveMemo } from '@/system/components/Icon/SVG/RemoveMemo';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

export default function Memo() {
  const [text, setText] = useState('새로운 메모입니다');
  const [showCloseButton, setShowCloseButton] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  return (
    <div
      className="memo-wrap"
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}>
      <div className="absolute bottom-27 w-360 z-[100] h-2 bg-white" />

      <div className="w-360 h-auto bg-white rounded-tl-8 rounded-tr-8 px-16 pt-16 pb-8">
        <Textarea
          ref={textareaRef}
          rows={1}
          className="w-full min-h-0 border-none p-0 text-14 resize-none focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-0"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </div>

      <AnimatePresence mode="wait">
        {showCloseButton && (
          // TODO: remove API
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute top-16 right-32">
            <RemoveMemo size={24} color="#37383C" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* TODO: 날짜 및 시간 */}
      <div className="memo pl-16 text-10 pb-16 text-neutral-35">00.00.00</div>
    </div>
  );
}
