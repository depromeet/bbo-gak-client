import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { Spacing } from '@/system/utils/Spacing';
import * as RadixDialog from '@radix-ui/react-dialog';
import { SearchBox } from './SearchBox';
import { useGetSearchCards } from './apis/useGetSearchCards';
import { SearchedCard } from './SearchedCard';
import { EasterEgg } from './EasterEgg';
import { useState } from 'react';
import { AsyncBoundaryWithQuery } from '@/lib';
import { If } from '@/system/utils/If';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function Content({ onClose }: SearchDialogProps) {
  const { data, mutate } = useGetSearchCards();
  const [showEaster, setShowEaster] = useState(false);

  return (
    <div className="z-[10000] fixed w-[calc(100vw-160px)] h-[calc(100vh-160px)] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[20px] bg-white p-[40px] pb-0">
      <div className="flex justify-between">
        <span className="text-heading1 text-neutral-95 font-bold">태그 검색</span>
        <TouchButton onClick={onClose}>
          <Icon name="close" size={24} color={color.neutral40} />
        </TouchButton>
      </div>
      <Spacing size={24} />
      <SearchBox
        hideTagHistory={data?.data.length !== 0}
        onSearchSubmit={(tagIdList: number[]) => mutate(tagIdList)}
        onShowEaster={() => setShowEaster(true)}
      />
      <If condition={!showEaster}>
        <div className="overflow-scroll grid flex-wrap" style={{ gap: 20, gridTemplateColumns: '1fr 1fr 1fr' }}>
          {data?.data.map((info) => <SearchedCard key={info.id} {...info} />)}
        </div>
      </If>
      {showEaster && <EasterEgg />}
    </div>
  );
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  if (open == false) {
    return null;
  }

  return (
    <RadixDialog.Root>
      <RadixDialog.Portal forceMount>
        <RadixDialog.Overlay forceMount onClick={onClose}>
          <div className="z-[10000] hihi fixed top-0 left-0 w-full h-full bg-[rgba(39,40,44,0.50)]" />
        </RadixDialog.Overlay>
        <RadixDialog.Content forceMount>
          <AsyncBoundaryWithQuery>
            <Content open={open} onClose={onClose} />
          </AsyncBoundaryWithQuery>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
