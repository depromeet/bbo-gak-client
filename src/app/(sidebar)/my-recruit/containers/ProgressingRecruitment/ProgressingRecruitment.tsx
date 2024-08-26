import { Spacing } from '@/system/utils/Spacing';
import { ShoeIcon } from '../components/ShoeIcon';
import { AsyncBoundaryWithQuery } from '@/lib';
import { ProgressingRecruitList } from './ProgressingRecruitList';
import { CardSkeleton } from '../components/CardSkeleton/CardSkeleton';

export function ProgressingRecruitment() {
  return (
    <>
      <div className="flex gap-[8px]">
        <ShoeIcon />
        <span className="text-heading2 font-semibold">현재 진행중인 공고 모아보기</span>
      </div>
      <Spacing size={24} />
      <AsyncBoundaryWithQuery
        errorFallback={
          <>
            <CardSkeleton variant="box" count={2} />
            <Spacing size={88} />
          </>
        }
        pendingFallback={
          <>
            <CardSkeleton variant="box" count={2} />
            <Spacing size={88} />
          </>
        }>
        <ProgressingRecruitList />
      </AsyncBoundaryWithQuery>
    </>
  );
}