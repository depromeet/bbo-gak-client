import { CloverLogo } from '@/system/components/Icon/SVG/CloverLogo';
import { RemoveMemo } from '@/system/components/Icon/SVG/RemoveMemo';
import { SubmitArrow } from '@/system/components/Icon/SVG/SubmitArrow';
import type { IconBaseType } from '@/system/components/Icon/SVG/type';
import { Add } from './SVG/Add';
import { AnnouncementFolder } from './SVG/AnnouncementFolder';
import { ArrowUp } from './SVG/ArrowUp';
import { Bell } from './SVG/Bell';
import { Calendar } from './SVG/Calendar';
import { CalendarFill } from './SVG/CalendarFill';
import { Check } from './SVG/Check';
import { Close } from './SVG/Close';
import { Clover } from './SVG/Clover';
import { CodingSignUp } from './SVG/CodingSignUp';
import { Copy } from './SVG/Copy';
import { Delete } from './SVG/Delete';
import { DesignSignUp } from './SVG/DesignSignUp';
import { Division } from './SVG/Division';
import { Down } from './SVG/Down';
import { DownChevron } from './SVG/DownChevron';
import { Downloads } from './SVG/Downloads';
import { Empty } from './SVG/Empty';
import { FilledMemo } from './SVG/FilledMemo';
import { Folder } from './SVG/Folder';
import { FolderFill } from './SVG/FolderFill';
import { FullScreenCorner } from './SVG/FullScreenCorner';
import { Google } from './SVG/Google';
import { Link } from './SVG/Link';
import { LogoOnly } from './SVG/LogoOnly';
import { Logout } from './SVG/Logout';
import { Memo } from './SVG/Memo';
import { MemoColored } from './SVG/MemoColored';
import { More } from './SVG/More';
import { Pip } from './SVG/Pip';
import { Profile } from './SVG/Profile';
import { ProfileFill } from './SVG/ProfileFill';
import { Refresh } from './SVG/Refresh';
import { Remove } from './SVG/Remove';
import { RightChevron } from './SVG/RightChevron';
import { Rocket } from './SVG/Rocket';
import { Search } from './SVG/Search';
import { Setting } from './SVG/Setting';
import { Shoes } from './SVG/Shoes';
import { Tag } from './SVG/Tag';
import { ToLeft } from './SVG/ToLeft';
import { Trash } from './SVG/Trash';
import { Unlink } from './SVG/Unlink';
import { Up } from './SVG/Up';
import Warning from './SVG/Warning';
import { WorkFill } from './SVG/WorkFill';
import { X } from './SVG/X';
import { IllustAlarm } from './SVG/IllustAlarm';
import { PageOpen } from './SVG/PageOpen';
import { BellWithRedDot } from './SVG/BellWithRedDot';
import { Backspace } from './SVG/Backspace';
import { SavingSuccess } from './SVG/SavingSuccess';

const iconMap = {
  bell: Bell,
  copy: Copy,
  check: Check,
  close: Close,
  division: Division,
  folderFill: FolderFill,
  memo: Memo,
  profile: Profile,
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
  google: Google,
  cloverLogo: CloverLogo,
  codingSignUp: CodingSignUp,
  designSignUp: DesignSignUp,
  fullScreenCorner: FullScreenCorner,
  toLeft: ToLeft,
  refresh: Refresh,
  empty: Empty,
  tag: Tag,
  shoes: Shoes,
  rocket: Rocket,
  logoOnly: LogoOnly,
  workFill: WorkFill,
  memoColored: MemoColored,
  download: Downloads,
  arrowUp: ArrowUp,
  logout: Logout,
  profileFill: ProfileFill,
  folder: Folder,
  announcementFolder: AnnouncementFolder,
  IllustAlarm: IllustAlarm,
  warning: Warning,
  pageOpen: PageOpen,
  bellWithRedDot: BellWithRedDot,
  backspace: Backspace,
  savingSuccess: SavingSuccess,
} as const;

export interface IconProps extends IconBaseType {
  name: keyof typeof iconMap;
}

// TODO: forwardRef처리
export function Icon({ name, color = '#F9F9FA', size = 24 }: IconProps) {
  return iconMap[name]({ color, size });
}

Icon.displayName = 'Icon';
