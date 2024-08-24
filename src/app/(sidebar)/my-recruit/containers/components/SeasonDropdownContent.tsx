import { Dropdown } from '@/system/components';
import { useGetSeasons } from '../../api/useGetSeasons';

interface SeasonDropdownContentProps {
  selectedSeason: string;
  onItemClick: (item: string) => void;
}

export const ALL_RECRUITMENT = '모든 공고';

export function SeasonDropdownContent({ selectedSeason, onItemClick }: SeasonDropdownContentProps) {
  const seasons = useGetSeasons().data;
  const seasonsIncludeAll = [{ name: ALL_RECRUITMENT }, ...seasons];

  return (
    <>
      {seasonsIncludeAll.map((season) => (
        <Dropdown.CheckedItem
          className="flex justify-between items-center"
          checked={selectedSeason === season.name}
          disabled={selectedSeason === season.name}
          onClick={() => onItemClick(season.name)}>
          <span className={'text-label1 font-medium'}>{season.name}</span>
        </Dropdown.CheckedItem>
      ))}
    </>
  );
}
