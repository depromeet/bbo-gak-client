'use client';

import dynamic from 'next/dynamic';
import { Input } from '@/system/components/Input/Input';
import { TagSelector } from './TagSelector/TagSelector';
import { abilityTags, personalityTags, categoryTags } from './TagSelector/constants';
import { If } from '@/components/If';
import { cn } from '@/utils';
import { Spacing } from '@/components/Spacing';
import { useWrite } from './hooks';

const EditorProvider = dynamic(
  () => import('@/components/Editor/EditorProvider/EditorProvider').then(({ EditorProvider }) => EditorProvider),
  { ssr: false },
);

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { handlePutCardTitle, handlePostCardTag, handleDeleteCardTag, title, selectedTags, selectedCategories } =
    useWrite(Number(id));

  return (
    <section className="px-80 pt-64 w-full h-full">
      <EditorProvider cardId={Number(id)}>
        <Input
          value={title}
          placeholder="제목을 입력해주세요."
          onValueChange={handlePutCardTitle}
          classNames={{ base: 'w-[552px]' }}
          className="text-24 font-bold px-0 leading-32 tracking-[-0.0345rem] border-none"
        />

        <Spacing direction="column" size={24} />

        <TagSelector>
          <TagSelector.Title>분류</TagSelector.Title>

          <TagSelector.Trigger>
            <If condition={!selectedCategories.length}>카드의 종류를 선택해주세요</If>
            <If condition={!!selectedCategories.length}>
              <ul className="flex gap-8">
                {selectedCategories.map((category) => (
                  <TagSelector.RemovalbleTag
                    key={category.name}
                    className="text-neutral-75 bg-neutral-3 z-[10]"
                    color="#37383C"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteCardTag(category, 'category');
                    }}>
                    {category.name}
                  </TagSelector.RemovalbleTag>
                ))}
              </ul>
            </If>
          </TagSelector.Trigger>

          <TagSelector.Content>
            <div className="px-16 pt-16 pb-20">
              <p className="text-12 font-medium text-neutral-40 pb-16">
                어떤 단계를 위한 정보인가요? <span className="text-neutral-30">(중복가능)</span>
              </p>
              <TagSelector.TagList title="분류">
                {categoryTags.map((tag) => (
                  <TagSelector.Tag
                    key={tag.name}
                    className="text-neutral-75 bg-neutral-3"
                    onClick={() => {
                      if (selectedCategories.length < 3 && !selectedCategories.find(({ name }) => name === tag.name)) {
                        handlePostCardTag(tag, 'category');
                      }
                    }}>
                    {tag.name}
                  </TagSelector.Tag>
                ))}
              </TagSelector.TagList>
            </div>
          </TagSelector.Content>
        </TagSelector>

        <TagSelector classNames={{ content: 'h-264' }}>
          <TagSelector.Title>태그</TagSelector.Title>

          <TagSelector.Trigger>
            <If condition={!selectedTags.length}>태그를 선택해주세요</If>
            <If condition={!!selectedTags.length}>
              <ul className="flex gap-8 z-[10]">
                {selectedTags.map((tag) => (
                  <TagSelector.RemovalbleTag
                    key={tag.name}
                    className={cn(
                      tag.type === 'ability' && 'text-[#418CC3] bg-[#E8F1FF]',
                      tag.type === 'personality' && 'text-[#9C6BB3] bg-[#F1E8FF]',
                    )}
                    color={tag.type === 'ability' ? '#418CC3' : '#9C6BB3'}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteCardTag(tag, 'tag');
                    }}>
                    {tag.name}
                  </TagSelector.RemovalbleTag>
                ))}
              </ul>
            </If>
          </TagSelector.Trigger>

          <TagSelector.Content>
            <div className="px-16 pt-16 pb-20">
              <p className="text-12 font-medium text-neutral-40 pb-16">최대 3개까지 설정 가능해요!</p>
              <TagSelector.TagList title="역량 태그">
                {abilityTags.map((tag) => (
                  <TagSelector.Tag
                    key={tag.name}
                    className="text-[#418CC3] bg-[#E8F1FF]"
                    onClick={() => {
                      if (selectedTags.length < 3 && !selectedTags.find(({ name }) => name === tag.name)) {
                        handlePostCardTag(tag, 'tag');
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
                        handlePostCardTag(tag, 'tag');
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
    </section>
  );
}
