import { Spacing } from '@/system/utils/Spacing';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { mockInfoList } from '../mock';
import { InfoCard } from '@/components/InfoCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';
import { Draggable } from '@/lib/dnd-kit/dnd-kit';
import { motion } from 'framer-motion';

interface Props {
  onCloseButtonClick: () => void;
}

const infoCategoryList = ['경험 정리', '자기소개서', '면접 질문'];

export function RightSidebar({ onCloseButtonClick }: Props) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 400 }}
      exit={{ width: 0 }}
      transition={{ duration: 0.4 }}
      className="w-400 relative">
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col fixed top-[16px] bottom-[16px] right-[16px] p-20 bg-neutral-3 w-370 rounded-[20px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.24)]">
        <TouchButton className="self-end" onClick={onCloseButtonClick}>
          <Icon name="close" size={24} color={color.neutral40} />
        </TouchButton>
        <Spacing size={25} />
        <div className="flex justify-between items-center">
          <span className="text-neutral-95 text-heading2 font-semibold">내 정보 가져오기</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-[4px] items-center">
                <span className="text-label2 font-semibold">경험 정리</span>
                <Icon name="down" color={color.neutral40} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {infoCategoryList.map((item) => (
                <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Spacing size={4} />
        <span className="text-label2 text-neutral-40">카드를 공고 폴더로 드래그해보세요</span>
        <Spacing size={24} />
        <ul className="flex flex-col items-center gap-[8px] overflow-auto">
          {mockInfoList.map((info) => (
            <li key={info.id} className="w-full">
              <Draggable id={info.id} dataForOverlay={info}>
                <InfoCard key={info.id} {...info} />
              </Draggable>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
