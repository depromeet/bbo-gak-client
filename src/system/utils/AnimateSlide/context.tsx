import { generateContext } from '@/lib';

interface AnimateSlideContext {
  currentIndex: number;
  skipIntroMotion: boolean;
}

export const [AnimateSlideProvider, useAnimateSlideContext] = generateContext<AnimateSlideContext>({
  name: 'AnimateSlide',
});

interface AnimateSlideItemContext {
  index: number;
}

export const [AnimateSlideItemProvider, useAnimateSlideItemContext] = generateContext<AnimateSlideItemContext>({
  name: 'AnimateSlideItem',
});
