import { useGetCardTags } from '@/app/(sidebar)/(my-info)/apis/useGetCardTags';
import { TagSelector } from '@/app/(sidebar)/write/[id]/components/TagSelector/TagSelector';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/system/components/Dialog/Dialog';
import { If } from '@/system/utils/If';
import { Spacing } from '@/system/utils/Spacing';
import { TagType } from '@/types/info';
import { CHOOSE_RECRUIT_TYPES, RecruitType } from '@/types/recruit';
import { cn } from '@/utils/tailwind-util';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { usePostCardInRecruit } from '../api/usePostCardInRecurit';

interface AddRecruitCardDialogProps {
  recruitId: string;
  category: RecruitType;
}

export function AddRecruitCardDialog({ children, recruitId, category }: PropsWithChildren<AddRecruitCardDialogProps>) {
  const router = useRouter();

  const [selectedTagList, setSelectedTagList] = useState<TagType[]>([]);
  const [selectedType, setSelectedType] = useState<RecruitType | null>(null);

  const [isOpenTagSelector, setIsOpenTagSelector] = useState(false);
  const [isOpenTypeSelector, setIsOpenTypeSelector] = useState(false);

  const { data: tagList } = useGetCardTags();
  const { mutateAsync: mutatePostCard } = usePostCardInRecruit();

  const abilityTagList = tagList?.filter((tag) => tag.type === '역량') ?? [];
  const personalityTagList = tagList?.filter((tag) => tag.type === '인성') ?? [];

  const handleCreateCard = async () => {
    if (!selectedType || !selectedTagList.length) return;

    const res = await mutatePostCard({
      cardType: selectedType,
      tagIdList: selectedTagList.map(({ id }) => id),
      recruitId,
    });

    router.push(`/write/${res.cardId}`);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setSelectedType(open && category !== '내_정보_복사' ? category : null);
        if (!open) {
          setSelectedTagList([]);
        }
      }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-24">
        <div className="flex flex-col gap-4">
          <DialogTitle className="text-neutral-95 text-body1 font-semibold">
            작성할 글에 대한 태그를 추가해주세요
          </DialogTitle>
          <p className="text-neutral-35 text-caption1">태그를 등록하고 나중에 쉽게 탐색해보세요.</p>
        </div>

        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-8">
            <TagSelector
              className="w-full"
              disabled={selectedTagList.length === 3}
              onChange={(open) => setIsOpenTagSelector(open)}>
              <TagSelector.Trigger className="w-full bg-neutral-1 h-46 border-b-0 py-10 px-12 text-neutral-30">
                <div className="w-full flex justify-between">
                  <If condition={!selectedTagList.length}>키워드 태그를 선택해주세요</If>
                  <If condition={!!selectedTagList.length}>
                    <ul className="flex gap-8">
                      {selectedTagList.map((tag) => (
                        <TagSelector.RemovalbleTag
                          key={tag.id}
                          className={cn(
                            tag.type === '역량' && 'text-blue-blue-text-1 bg-blue-blue-bg-1',
                            tag.type === '인성' && 'text-blue-purple-text-1 bg-blue-purple-bg-1',
                          )}
                          color={tag.type === '역량' ? '#418CC3' : '#9C6BB3'}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedTagList((prev) => prev.filter(({ id }) => id !== tag.id));
                          }}>
                          <li>{tag.name}</li>
                        </TagSelector.RemovalbleTag>
                      ))}
                    </ul>
                  </If>
                  {!isOpenTagSelector && <Icon name="downChevron" color="#878A93" size={20} />}
                </div>
              </TagSelector.Trigger>

              <TagSelector.Content className="w-full left-0 top-46 border-t-0 px-16 pt-16 pb-24">
                <TagSelector.Notice>최대 3개까지 선택 가능해요!</TagSelector.Notice>

                <TagSelector.TagList title="역량 태그">
                  {abilityTagList.map((tag) => (
                    <TagSelector.Tag
                      key={tag.id}
                      className="text-blue-blue-text-1 bg-blue-blue-bg-1"
                      onClick={() => {
                        if (selectedTagList.length < 3 && !selectedTagList.find(({ id }) => id === tag.id)) {
                          setSelectedTagList((prev) => [...prev, tag]);
                        }
                      }}>
                      {tag.name}
                    </TagSelector.Tag>
                  ))}
                </TagSelector.TagList>

                <Spacing direction="column" size={20} />

                <TagSelector.TagList title="인성 태그">
                  {personalityTagList.map((tag) => (
                    <TagSelector.Tag
                      key={tag.id}
                      className="text-blue-purple-text-1 bg-blue-purple-bg-1"
                      onClick={() => {
                        if (selectedTagList.length < 3 && !selectedTagList.find(({ id }) => id === tag.id)) {
                          setSelectedTagList((prev) => [...prev, tag]);
                        }
                      }}>
                      {tag.name}
                    </TagSelector.Tag>
                  ))}
                </TagSelector.TagList>
              </TagSelector.Content>
            </TagSelector>
            <TagSelector className="w-full" onChange={(open) => setIsOpenTypeSelector(open)}>
              <TagSelector.Trigger className="w-full bg-neutral-1 h-46 border-b-0 py-10 px-12 text-neutral-30">
                <div className="w-full flex justify-between">
                  <If condition={selectedType == null}>글의 종류를 선택해주세요</If>
                  <If condition={selectedType != null}>
                    <ul className="flex gap-8">
                      <TagSelector.RemovalbleTag
                        className="text-yellow-1 bg-yellow-bg-1"
                        color="#D77B0F"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedType(null);
                        }}>
                        <li>{selectedType?.replaceAll('_', ' ')}</li>
                      </TagSelector.RemovalbleTag>
                    </ul>
                  </If>
                  {!isOpenTypeSelector && <Icon name="downChevron" color="#878A93" size={20} />}
                </div>
              </TagSelector.Trigger>
              <TagSelector.Content className="w-full left-0 top-46 border-t-0 px-16 pt-16 pb-20">
                <TagSelector.Notice className="pb-12">1개만 선택 가능해요!</TagSelector.Notice>
                <TagSelector.TagList>
                  {CHOOSE_RECRUIT_TYPES.map((type) => (
                    <TagSelector.Tag
                      key={type}
                      className="text-yellow-1 bg-yellow-bg-1"
                      onClick={() => {
                        setSelectedType(type);
                      }}>
                      {type.replaceAll('_', ' ')}
                    </TagSelector.Tag>
                  ))}
                </TagSelector.TagList>
              </TagSelector.Content>
            </TagSelector>
          </div>
          <DialogClose asChild>
            <TouchButton
              className="rounded-6 bg-neutral-95 text-white py-13 disabled:bg-neutral-5 disabled:text-neutral-30"
              disabled={!selectedTagList.length || !selectedType}
              onClick={handleCreateCard}>
              선택 완료
            </TouchButton>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
