import { Search } from './SVG/Search';
import { Folder } from './SVG/Folder';
import { Bell } from './SVG/Bell';
import { Memo } from './SVG/Memo';
import { Profile } from './SVG/Profile';
import { Setting } from './SVG/Setting';
import { Logout } from './SVG/Logout';
import { Down } from './SVG/Down';
import { Add } from './SVG/Add';
import { More } from './SVG/More';
import { Division } from './SVG/Division';
import { RightChevron } from './SVG/RightChevron';
import { ProfileFill } from './SVG/ProfileFill';
import type { IconBaseType } from '@/system/components/Icon/SVG/type';
import { Delete } from './SVG/Delete';
import { Pip } from './SVG/Pip';

const iconMap = {
  bell: Bell,
  division: Division,
  folder: Folder,
  logout: Logout,
  memo: Memo,
  profile: Profile,
  profileFill: ProfileFill,
  rightChevron: RightChevron,
  search: Search,
  setting: Setting,
  down: Down,
  add: Add,
  more: More,
  delete: Delete,
  pip: Pip,
} as const;

export interface IconProps extends IconBaseType {
  name: keyof typeof iconMap;
}

// TODO: forwardRef처리
export function Icon({ name, color = '#F9F9FA', size = 24 }: IconProps) {
  return iconMap[name]({ color, size });
}

Icon.displayName = 'Icon';
