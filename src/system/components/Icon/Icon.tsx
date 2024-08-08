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
import { Remove } from './SVG/Remove';
import Copy from './SVG/Copy';
import { Up } from './SVG/Up';
import { Check } from './SVG/Check';
import { Trash } from './SVG/Trash';
import { Link } from './SVG/Link';
import { Unlink } from './SVG/Unlink';
import { Calendar } from './SVG/Calendar';
import { CalendarFill } from './SVG/CalendarFill';

const iconMap = {
  bell: Bell,
  copy: Copy,
  check: Check,
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
  remove: Remove,
  trash: Trash,
  up: Up,
  link: Link,
  unlink: Unlink,
  calendar: Calendar,
  calendarFill: CalendarFill,
} as const;

export interface IconProps extends IconBaseType {
  name: keyof typeof iconMap;
}

// TODO: forwardRef처리
export function Icon({ name, color = '#F9F9FA', size = 24 }: IconProps) {
  return iconMap[name]({ color, size });
}

Icon.displayName = 'Icon';
