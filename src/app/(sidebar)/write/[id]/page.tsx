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
    categoryTags,
    content,
    updatedDate,
    disabledCount,
    handlePutCardType,
  } = useWrite(Number(id));

  return (
    <section className="h-full">
      <section className="flex">
        <div className="pt-64 w-full">
          <EditorProvider cardId={Number(id)} initialContent={content}>
            <div className="flex justify-between px-80">
              <Input
                value={title}
                onValueChange={handlePutCardTitle}
                placeholder="제목을 입력해주세요."
                classNames={{ base: 'w-[552px]' }}
                className="text-[24px] font-bold px-0 leading-32 tracking-[-0.0345rem] border-none"
              />
              <div className="flex gap-8 items-center text-neutral-20">
                <p>{updatedDate}</p>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icon name="more" color="black" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex gap-4 w-176 h-52 pl-16 cursor-pointer">
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
                          handlePutCardType(category, 'delete');
                        }}>
                        {category.replace('_', ' ')}
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
                        {tag.replace('_', ' ')}
                      </TagSelector.Tag>
                    ))}
                  </TagSelector.TagList>
                </div>
              </TagSelector.Content>
            </TagSelector>

            <TagSelector
              disabled={selectedTags.length === 3}
              classNames={{ base: 'px-80', content: 'h-264', trigger: 'hover:bg-neutral-1' }}>
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
