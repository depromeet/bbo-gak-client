import { Spacing } from '@/system/utils/Spacing';
import { ShoeIcon } from '../components/ShoeIcon';
import { AsyncBoundaryWithQuery } from '@/lib';
import { ProgressingRecruitList } from './ProgressingRecruitList';

export function ProgressingRecruitment() {
  return (
    <>
      <div className="flex gap-[8px]">
        <ShoeIcon />
        <span className="text-heading2 font-semibold">현재 진행중인 공고 모아보기</span>
      </div>
      <Spacing size={24} />
      <AsyncBoundaryWithQuery>
        <ProgressingRecruitList />
      </AsyncBoundaryWithQuery>
    </>
  );
}
