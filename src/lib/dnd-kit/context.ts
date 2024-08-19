import { generateContext } from '@/lib';

interface DndAdditionalContext {
  selectedId: number | string;
}

export const [DndAdditionalProvider, useDndAdditionalContext] = generateContext<DndAdditionalContext>({
  name: 'DndContextWithOverlay',
});
