import { Children, PropsWithChildren } from 'react';
import { AnimateSlideItemProvider, AnimateSlideProvider } from '../context';

interface Props {
  height: number;
  skipIntroMotion?: boolean;
  currentIndex?: number;
}

export function Root({ currentIndex = 0, skipIntroMotion = true, height, children }: PropsWithChildren<Props>) {
  return (
    <AnimateSlideProvider currentIndex={currentIndex} skipIntroMotion={skipIntroMotion}>
      <div className="relative w-full" style={{ height }}>
        {Children.toArray(children).map((child, index) => (
          <AnimateSlideItemProvider key={index} index={index}>
            {child}
          </AnimateSlideItemProvider>
        ))}
      </div>
    </AnimateSlideProvider>
  );
}
