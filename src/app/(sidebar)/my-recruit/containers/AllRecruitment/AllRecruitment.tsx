'use client';

import { Dropdown, Icon } from '@/system/components';
import { RocketIcon } from '../components/RocketIcon';
import { Spacing } from '@/system/utils/Spacing';
import { AllRecruitList } from '@/app/(sidebar)/my-recruit/containers/AllRecruitment/AllRecruitList';
import { AsyncBoundaryWithQuery } from '@/lib';
import { SeasonDropdownContent } from '../components/SeasonDropdownContent';
import { useState } from 'react';
import { ALL_RECRUITMENT } from '../components/SeasonDropdownContent';
import { CardSkeleton } from '@/app/(sidebar)/my-recruit/containers/components/CardSkeleton/CardSkeleton';

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