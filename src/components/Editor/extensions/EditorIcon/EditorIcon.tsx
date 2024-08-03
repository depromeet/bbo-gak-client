import { memo } from 'react';
import { icons } from 'lucide-react';
import { cn } from '@/utils';

export type IconProps = {
  name: keyof typeof icons;
  className?: string;
  strokeWidth?: number;
};

export const EditorIcon = memo(({ name, className, strokeWidth }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }
  return <IconComponent className={cn('w-16 h-16', className)} strokeWidth={strokeWidth || 2.5} />;
});

EditorIcon.displayName = 'Icon';
