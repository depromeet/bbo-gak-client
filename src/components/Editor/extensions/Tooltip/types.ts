import type { ReactNode } from 'react';
import type { Placement, Props } from 'tippy.js';

export interface TooltipProps {
  children?: string | ReactNode;
  enabled?: boolean;
  title?: string;
  shortcut?: string[];
  tippyOptions?: Omit<Partial<Props>, 'content'>;
  content?: ReactNode;
}

export interface TippyProps {
  'data-placement': Placement;
  'data-reference-hidden'?: string;
  'data-escaped'?: string;
}
