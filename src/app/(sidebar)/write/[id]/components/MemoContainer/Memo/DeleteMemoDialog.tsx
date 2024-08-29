import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/system/components/Dialog/Dialog';
import { StrictPropsWithChildren } from '@/types';
import { useDeleteMemo } from '@/app/(sidebar)/write/[id]/api/useDeleteMemo';
import { TouchButton } from '@/components/TouchButton';

export function DeleteMemoDialog({
  cardId,
  memo,
  children,
}: StrictPropsWithChildren<{ memo: string; cardId: number }>) {
  const { mutate } = useDeleteMemo(cardId);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="border-1 w-460 h-232 p-32 pt-24 flex flex-col gap-36">
        <div className="mt-36 text-20 font-bold text-center">
          <p className="w-360 overflow-hidden text-ellipsis whitespace-pre-wrap">{memo}</p>
          <p>메모를 정말 삭제하시겠습니까?</p>
        </div>

        <div className="flex gap-16 justify-between">
          <DialogClose>
            <TouchButton className="border-1 border-neutral-5 rounded-6 w-190 h-48">취소</TouchButton>
          </DialogClose>

          <TouchButton className="bg-neutral-95 text-white rounded-6 w-190 h-48" onClick={() => mutate(cardId)}>
            삭제
          </TouchButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
