'use client';

import dynamic from 'next/dynamic';
import { Input } from '@/system/components/Input/Input';
import { TagSelector } from './components/TagSelector/TagSelector';
import { If } from '@/system/utils/If';
import { Spacing } from '@/system/utils/Spacing';
import { cn } from '@/utils';
import { useWrite } from './hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';
import { Icon } from '@/system/components';
import MemoContainer from './components/MemoContainer/MemoContainer';
import { MemosFetcher } from '@/app/(sidebar)/write/[id]/fetcher/MemosFetcher';
import { INFO_TYPES } from '@/types/info';
import { Textarea } from '@/system/components/Textarea/Textarea';
import { TouchButton } from '@/components/TouchButton';

const EditorProvider = dynamic(
  () => import('@/components/Editor/EditorProvider/EditorProvider').then(({ EditorProvider }) => EditorProvider),
  { ssr: false },
);

export default function Page({ params: { id } }: { params: { id: string } }) {
  const {
    handlePutCardTitle,
    handlePostCardTag,
    handleDeleteCardTag,
    title,
    selectedTags,
    selectedCategories,
    personalityTags,
    abilityTags,
    content,
    updatedDate,
    disabledCount,
    handlePutCardType,
    deleteCard,
    createdDate,
    recruitTitle,
    back,
  } = useWrite(Number(id));

  return (
    <section className="h-full">
      <section className="flex">
        <div className="pt-40 w-full">
          <div className="h-16 pl-80">
            <If condition={recruitTitle != null}>
              <div className="flex gap-4 text-12 text-neutral-30 mt-8">
                <Icon name="announcementFolder" size={16} color="#CCCDD1" />
                <p>{recruitTitle}</p>
              </div>
            </If>
          </div>

          <EditorProvider cardId={Number(id)} initialContent={content}>
            <div className="flex justify-between items-center pr-80 relative">
              <TouchButton onClick={back} className="absolute left-40 mt-3">
                <Icon name="backspace" size={24} color="#1B1C1E" />
              </TouchButton>

              <Textarea
                value={title}
                onChange={(e) => handlePutCardTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
                className="text-[24px] h-32 !min-h-32 font-bold resize-none bg-neutral-1 px-0 leading-32 tracking-[-0.0345rem] border-none focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-30 pl-80 "
              />
              <div className="flex gap-8 items-center text-neutral-20 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <If condition={updatedDate != null && updatedDate !== createdDate}>
                    <p className="text-12 text-neutral-50">{updatedDate} 수정됨</p>
                  </If>

                  <p className="text-12">
                    {updatedDate != null && updatedDate !== createdDate ? `(${createdDate || ''} 생성됨)` : createdDate}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icon name="more" color="black" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => deleteCard(Number(id))}
                      className="flex gap-4 w-176 h-52 pl-16 cursor-pointer">
                      <Icon name="trash" size={20} color="#FF5C5C" />
                      <p className="text-[#FF5C5C] text-15">삭제하기</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Spacing direction="column" size={24} />

            <TagSelector
              disabled={selectedCategories.length === disabledCount}
              classNames={{ base: 'px-80', trigger: 'hover:bg-neutral-1' }}>
              <TagSelector.Title>분류</TagSelector.Title>

              <TagSelector.Trigger>
                <If condition={!selectedCategories.length}>카드의 종류를 선택해주세요</If>
                <If condition={!!selectedCategories.length}>
                  <ul className="flex gap-8">
                    {selectedCategories.map((category) => (
                      <TagSelector.RemovalbleTag
                        key={category}
                        className="text-yellow-1 bg-yellow-bg-1 z-[10]"
                        color="#37383C"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (category === '내_정보_복사') {
                            return;
                          }
                          handlePutCardType(category, 'delete');
                        }}>
                        {category.replace(/_/g, ' ')}
                      </TagSelector.RemovalbleTag>
                    ))}
                  </ul>
                </If>
              </TagSelector.Trigger>

              <TagSelector.Content>
                <div className="px-16 pt-16 pb-20">
                  <TagSelector.Notice>
                    어떤 단계를 위한 정보인가요? <span className="text-neutral-30">(중복가능)</span>
                  </TagSelector.Notice>

                  <TagSelector.TagList title="분류">
                    {INFO_TYPES.map((tag) => (
                      <TagSelector.Tag
                        key={tag}
                        className="text-yellow-1 bg-yellow-bg-1"
                        onClick={() => {
                          if (
                            selectedCategories.length < disabledCount &&
                            !selectedCategories.find((category) => category === tag)
                          ) {
                            handlePutCardType(tag, 'put');
                          }
                        }}>
                        {tag.replace(/_/g, ' ')}
                      </TagSelector.Tag>
                    ))}
                  </TagSelector.TagList>
                </div>
              </TagSelector.Content>
            </TagSelector>

            <TagSelector
              disabled={selectedTags.length === 3}
              classNames={{ base: 'px-80', trigger: 'hover:bg-neutral-1' }}>
              <TagSelector.Title>태그</TagSelector.Title>

              <TagSelector.Trigger>
                <If condition={!selectedTags.length}>태그를 선택해주세요</If>
                <If condition={!!selectedTags.length}>
                  <ul className="flex gap-8 z-[10]">
                    {selectedTags.map((tag) => (
                      <TagSelector.RemovalbleTag
                        key={tag.name}
                        className={cn(
                          tag.type === '역량' && 'text-[#418CC3] bg-[#E8F1FF]',
                          tag.type === '인성' && 'text-[#9C6BB3] bg-[#F1E8FF]',
                        )}
                        color={tag.type === '역량' ? '#418CC3' : '#9C6BB3'}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteCardTag(tag);
                        }}>
                        {tag.name}
                      </TagSelector.RemovalbleTag>
                    ))}
                  </ul>
                </If>
              </TagSelector.Trigger>

              <TagSelector.Content>
                <div className="px-16 pt-16 pb-20">
                  <TagSelector.Notice>최대 3개까지 설정 가능해요!</TagSelector.Notice>

                  <TagSelector.TagList title="역량 태그">
                    {abilityTags.map((tag) => (
                      <TagSelector.Tag
                        key={tag.name}
                        className="text-[#418CC3] bg-[#E8F1FF]"
                        onClick={() => {
                          if (selectedTags.length < 3 && !selectedTags.find(({ name }) => name === tag.name)) {
                            handlePostCardTag(tag);
                          }
                        }}>
                        {tag.name}
                      </TagSelector.Tag>
                    ))}
                  </TagSelector.TagList>

                  <Spacing direction="column" size={20} />

                  <TagSelector.TagList title="인성 태그">
                    {personalityTags.map((tag) => (
                      <TagSelector.Tag
                        key={tag.name}
                        className="text-[#9C6BB3] bg-[#F1E8FF]"
                        onClick={() => {
                          if (selectedTags.length < 3 && !selectedTags.find(({ name }) => name === tag.name)) {
                            handlePostCardTag(tag);
                          }
                        }}>
                        {tag.name}
                      </TagSelector.Tag>
                    ))}
                  </TagSelector.TagList>
                </div>
              </TagSelector.Content>
            </TagSelector>

            <Spacing direction="column" size={20} />
          </EditorProvider>
        </div>

        <Spacing direction="column" size={20} />

        <MemosFetcher cardId={id}>
          <MemoContainer />
        </MemosFetcher>
      </section>
    </section>
  );
}
