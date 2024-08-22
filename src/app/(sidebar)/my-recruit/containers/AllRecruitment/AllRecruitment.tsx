'use client';

import { Dropdown, Icon } from '@/system/components';
import { RocketIcon } from '../components/RocketIcon';
import { Spacing } from '@/system/utils/Spacing';
import { AllRecruitList } from '@/app/(sidebar)/my-recruit/containers/AllRecruitment/AllRecruitList';
import { AsyncBoundaryWithQuery } from '@/lib';
import { SeasonDropdownContent } from '../components/SeasonDropdownContent';
import { useState } from 'react';
import { ALL_RECRUITMENT } from '../components/SeasonDropdownContent';

export function AllRecruitment() {
  const [selectedSeason, setSelectedSeason] = useState(ALL_RECRUITMENT);

  return (
    <>
      <Dropdown>
        <button className="flex gap-[8px] outline-none">
          <RocketIcon />
          <Dropdown.Trigger asChild>
            <div className="flex gap-[8px]">
              <span className="text-heading2 font-semibold">{selectedSeason}</span>
              <Dropdown.TriggerArrow />
            </div>
          </Dropdown.Trigger>
        </button>
        <Dropdown.Content className="min-w-175">
          <SeasonDropdownContent selectedSeason={selectedSeason} onItemClick={setSelectedSeason} />
        </Dropdown.Content>
      </Dropdown>
      <Spacing size={24} />

      <AsyncBoundaryWithQuery>
        <AllRecruitList selectedSeason={selectedSeason} />
      </AsyncBoundaryWithQuery>

      <Spacing size={60} />
    </>
  );
}
