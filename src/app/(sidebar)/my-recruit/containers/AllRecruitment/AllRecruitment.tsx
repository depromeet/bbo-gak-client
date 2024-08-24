'use client';

import { AllRecruitList } from '@/app/(sidebar)/my-recruit/containers/AllRecruitment/AllRecruitList';
import { CardSkeleton } from '@/app/(sidebar)/my-recruit/containers/components/CardSkeleton/CardSkeleton';
import { AsyncBoundaryWithQuery } from '@/lib';
import { Dropdown } from '@/system/components';
import { Spacing } from '@/system/utils/Spacing';
import { useState } from 'react';
import { RocketIcon } from '../components/RocketIcon';
import { ALL_RECRUITMENT, SeasonDropdownContent } from '../components/SeasonDropdownContent';

export function AllRecruitment() {
  const [selectedSeason, setSelectedSeason] = useState(ALL_RECRUITMENT);

  return (
    <>
      <Dropdown colorVariant="black">
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

      <AsyncBoundaryWithQuery
        errorFallback={
          <>
            <CardSkeleton variant="row" count={5} />
            <Spacing size={88} />
          </>
        }
        pendingFallback={
          <>
            <CardSkeleton variant="row" count={5} />
            <Spacing size={88} />
          </>
        }>
        <AllRecruitList selectedSeason={selectedSeason} />
      </AsyncBoundaryWithQuery>

      <Spacing size={60} />
    </>
  );
}
