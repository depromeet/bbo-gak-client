import { RowCard } from '@/app/(sidebar)/my-recruit/containers/components/Card/RowCard';
import { Droppable, useDndContext } from '@/lib/dnd-kit/dnd-kit';
import { motion } from 'framer-motion';
import { color } from '@/system/token/color';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { useGetAllRecruits } from '../../api/useGetAllRecruits';
import { SwitchCase } from '@/system/utils/SwitchCase';
import { usePatchRecruitStatus } from '@/app/(sidebar)/my-recruit/api/usePatchRecruitStatus';
import { useDeleteRecruit } from '@/app/(sidebar)/my-recruit/api/useDeleteRecruit';

interface Props {
  selectedSeason: string;
}

export function AllRecruitList({ selectedSeason }: Props) {
  const { over } = useDndContext();
  const allRecruits = useGetAllRecruits({ season: selectedSeason }).data;

  const { mutate: patchRecruitStatus } = usePatchRecruitStatus();
  const { mutate: deleteRecruit } = useDeleteRecruit();

  return (
    <>
      <SwitchCase
        value={allRecruits.length === 0 ? 'empty' : 'present'}
        caseBy={{
          empty: (
            <Dialog.Trigger asChild>
              <motion.button
                initial="initial"
                whileHover="hover"
                variants={{ initial: { backgroundColor: 'transparent' }, hover: { backgroundColor: color.neutral5 } }}
                className="w-full h-70 flex justify-center items-center rounded-[12px] border-neutral-30 border-dashed border-[1px]">
                <span className="text-neutral-30 text-label1">등록된 공고가 없어요</span>
              </motion.button>
            </Dialog.Trigger>
          ),
          present: (
            <div className="flex flex-col gap-[12px]">
              {allRecruits.map((cardInfo) => (
                <Droppable
                  key={`${cardInfo.season}-${cardInfo.title}`}
                  id={cardInfo.id}
                  dataForOverlay={{ title: cardInfo.title }}>
                  <RowCard
                    highlighted={cardInfo.id === over?.id}
                    {...cardInfo}
                    onRecruitDelete={deleteRecruit}
                    onRecruitStatusChange={(id, status) => {
                      patchRecruitStatus({ id, recruitStatus: status });
                    }}
                  />
                </Droppable>
              ))}
            </div>
          ),
        }}
      />
    </>
  );
}
