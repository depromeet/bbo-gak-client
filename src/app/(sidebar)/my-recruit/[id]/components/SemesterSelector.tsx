import { Dropdown, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { cn } from '@/utils';
import { Key, useState } from 'react';
import { SeasonType, useGetSeasons } from '../api/useGetSeason';
import { usePatchSeason } from '../api/usePatchSeason';

export default function SemesterSelector({ recruitId, season }: { recruitId: string; season: string }) {
  const { data: seasons } = useGetSeasons();
  const { mutate: patchSeason } = usePatchSeason();

  const [clickSemester, setClickSemester] = useState(season);

  const handlePatchStatus = (status: string) => {
    setClickSemester(status);
    patchSeason({ newSeason: status, id: recruitId });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className="flex items-center border border-gray-200 bg-white rounded px-[8px] py-[4px] group">
          <p className="text-label2 font-medium">{clickSemester}</p>
          <span className="hidden group-hover:block group-active:block">
            <Icon name="downChevron" size={22} color={color.neutral50} />
          </span>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content className="mt-[8px]" align="start">
        {seasons &&
          seasons.map((item: SeasonType, index: Key) => (
            <Dropdown.CheckedItem
              key={index}
              className={cn(
                'text-[15px] font-normal',
                clickSemester === item.name ? 'text-[#AEB0B8] flex justify-between' : '',
              )}
              onClick={() => {
                handlePatchStatus(item.name);
              }}>
              {item.name}
              {clickSemester === item.name && <Icon name="check" size={16} color={color.neutral30} />}
            </Dropdown.CheckedItem>
          ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
