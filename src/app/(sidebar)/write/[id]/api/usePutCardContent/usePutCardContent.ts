import type { JSONContent } from '@tiptap/react';
import { useMutation } from '@tanstack/react-query';
import { http } from '@/apis/http';

const putCardContent = (cardId: number, content: JSONContent) =>
  http.put({
    url: `/cards/${cardId}/content`,
    data: { content: JSON.stringify(content) },
  });

export const usePutCardContent = (cardId: number) =>
  useMutation({
    mutationKey: ['put-card-content', cardId],
    mutationFn: (content: JSONContent) => putCardContent(cardId, content),
  });
