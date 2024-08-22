import { Dropdown, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { cn } from '@/utils';
import { useState } from 'react';

const SEASON_OPTIONS = ['2024 상반기', '2023 하반기', '2023 상반기'] as const;

export default function SemesterSelector() {
  const [clickSemester, setClickSemester] = useState<string>('2024 상반기');

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <div className="flex items-center border border-gray-200 bg-white rounded px-[8px] py-[4px] group">
          <p className="text-label2 font-medium">{clickSemester}</p>
          <span className="hidden group-hover:block group-active:block">
            <Icon name="downChevron" size={18} color={color.neutral50} />
          </span>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content className="mt-[8px]" align="start">
        {SEASON_OPTIONS.map((item, index) => (
          <Dropdown.CheckedItem
            key={index}
            className={cn(
              'text-[15px] font-normal',
              clickSemester === item ? 'text-[#AEB0B8] flex justify-between' : '',
            )}
            onClick={() => {
              setClickSemester(item);
            }}>
            {item}
            {clickSemester === item && <Icon name="check" size={16} color={color.neutral30} />}
          </Dropdown.CheckedItem>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
