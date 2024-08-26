import { RemoveMemo } from '@/system/components/Icon/SVG/RemoveMemo';
import { SubmitArrow } from '@/system/components/Icon/SVG/SubmitArrow';
import type { IconBaseType } from '@/system/components/Icon/SVG/type';
import { Add } from './SVG/Add';
import { Bell } from './SVG/Bell';
import { Calendar } from './SVG/Calendar';
import { CalendarFill } from './SVG/CalendarFill';
import { Check } from './SVG/Check';
import { Close } from './SVG/Close';
import { Clover } from './SVG/Clover';
import { CodingSignUp } from './SVG/CodingSignUp';
import Copy from './SVG/Copy';
import { Delete } from './SVG/Delete';
import { DesignSignup } from './SVG/DesignSignup';
import { Division } from './SVG/Division';
import { Down } from './SVG/Down';
import { DownChevron } from './SVG/DownChevron';
import { Empty } from './SVG/Empty';
import { FilledMemo } from './SVG/FilledMemo';
import { Folder } from './SVG/Folder';
import { FolderFill } from './SVG/FolderFill';
import { Link } from './SVG/Link';
import LogoOnly from './SVG/LogoOnly';
import { Logout } from './SVG/Logout';
import { Memo } from './SVG/Memo';
import { More } from './SVG/More';
import { Pip } from './SVG/Pip';
import { Profile } from './SVG/Profile';
import { ProfileFill } from './SVG/ProfileFill';
import { Refresh } from './SVG/Refresh';
import { Remove } from './SVG/Remove';
import { RightChevron } from './SVG/RightChevron';
import Rocket from './SVG/Rocket';
import { Search } from './SVG/Search';
import { Setting } from './SVG/Setting';
import Shoes from './SVG/Shoes';
import { Tag } from './SVG/Tag';
import { Trash } from './SVG/Trash';
import { Unlink } from './SVG/Unlink';
import { Up } from './SVG/Up';
import { X } from './SVG/X';

const iconMap = {
  bell: Bell,
  copy: Copy,
  check: Check,
  close: Close,
  division: Division,
  folder: Folder,
  folderFill: FolderFill,
  logout: Logout,
  memo: Memo,
  profile: Profile,
  profileFill: ProfileFill,
  rightChevron: RightChevron,
  downChevron: DownChevron,
  search: Search,
  setting: Setting,
  down: Down,
  add: Add,
  more: More,
  delete: Delete,
  pip: Pip,
  x: X,
  remove: Remove,
  trash: Trash,
  up: Up,
  link: Link,
  unlink: Unlink,
  calendar: Calendar,
  calendarFill: CalendarFill,
  submitArrow: SubmitArrow,
  filledMemo: FilledMemo,
  removeMemo: RemoveMemo,
  clover: Clover,
  refresh: Refresh,
  empty: Empty,
  tag: Tag,
  designSignUp: DesignSignup,
  shoes: Shoes,
  rocket: Rocket,
  logoOnly: LogoOnly,
  codingSignUp: CodingSignUp,
} as const;

export interface IconProps extends IconBaseType {
  name: keyof typeof iconMap;
}

// TODO: forwardRef처리
export function Icon({ name, color = '#F9F9FA', size = 24 }: IconProps) {
  return iconMap[name]({ color, size });
}

Icon.displayName = 'Icon';
