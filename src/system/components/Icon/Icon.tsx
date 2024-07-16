import { forwardRef } from 'react';
import { Search } from './icons/search';
import { IconBaseType } from '@/system/components/Icon/icons/type';
import { Folder } from './icons/folder';
import { Bell } from './icons/bell';
import { Memo } from './icons/memo';
import { Profile } from './icons/profile';
import { Setting } from './icons/setting';
import { Logout } from './icons/logout';

const iconMap = {
  bell: Bell,
  folder: Folder,
  logout: Logout,
  memo: Memo,
  profile: Profile,
  search: Search,
  setting: Setting,
} as const;

export interface IconProps extends IconBaseType {
  name: keyof typeof iconMap;
}

// TODO: forwardRef처리
export function Icon({ name, color = '#F9F9FA', size = 24 }: IconProps) {
  return iconMap[name]({ color, size });
}

Icon.displayName = 'Icon';
