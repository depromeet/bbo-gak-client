'use client';

import { generateContext } from '@/lib';
import { useState } from 'react';
import { CardWindow } from './CardWindow';
import { AnimatePresence } from 'framer-motion';

interface CardWindowContext {
  isOpen: boolean;
  open: (cardId: number) => void;
  close: () => void;
}

const [CardWindowProvider, useCardWindowContext] = generateContext<CardWindowContext>({
  name: 'CardWindow',
});

function CardWindowLayout({ children }: { children: React.ReactNode }) {
  const [cardId, setCardId] = useState<number | null>(null);

  const isOpen = cardId !== null;

  const open = (cardId: number) => {
    setCardId(cardId);
  };

  const close = () => {
    setCardId(null);
  };

  return (
    <CardWindowProvider isOpen={isOpen} open={open} close={close}>
      {children}
      <AnimatePresence>{isOpen && <CardWindow cardId={cardId} onClose={close} />}</AnimatePresence>
    </CardWindowProvider>
  );
}

export { CardWindowLayout, useCardWindowContext };
