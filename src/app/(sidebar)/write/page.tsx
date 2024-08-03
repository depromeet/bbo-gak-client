'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Input } from '@/system/components/Input/Input';
import { TagSelectorGroup } from './TagSelector/TagSelectorGroup';
import { TagSelector } from './TagSelector/TagSelector';
import { abilityTags, personalityTags, categoryTags, tags, categories } from './TagSelector/constants';
import { If } from '@/components/If';
import { cn } from '@/utils';

const Editor = dynamic(() => import('@/components/Editor/Editor').then(({ Editor }) => Editor), { ssr: false });

export default function Page() {
  const [currentTag, setCurrentTag] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<typeof tags>([]);
  const [selectedCategories, setSelectedCategories] = useState<typeof categories>([]);

  return (
    <section className="px-80 pt-64 w-full h-full">
      <TagSelectorGroup value={currentTag} setValue={setCurrentTag}>
        <TagSelector value="category">
          <TagSelector.Title>분류</TagSelector.Title>

          <TagSelector.Trigger>
            <If condition={!selectedCategories.length}>카드의 종류를 선택해주세요</If>
            <If condition={!!selectedCategories.length}>
              <ul className="flex gap-8">
                {selectedCategories.map((category) => (
                  <TagSelector.RemovalbleTag
                    key={category.value}
                    className="text-neutral-75 bg-neutral-3 z-[10]"
                    color="#37383C"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedCategories((prev) => prev.filter(({ value }) => value !== category.value));
                    }}>
                    {category.value}
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
                    key={tag.value}
                    className="text-neutral-75 bg-neutral-3"
                    onClick={() => {
                      if (selectedCategories.length < 3) {
                        setSelectedCategories((prev) => [...prev, tag]);
                      }
                    }}>
                    {tag.value}
                  </TagSelector.Tag>
                ))}
              </TagSelector.TagList>
            </div>
          </TagSelector.Content>
        </TagSelector>

        <TagSelector value="tag" classNames={{ content: 'h-264' }}>
          <TagSelector.Title>태그</TagSelector.Title>

          <TagSelector.Trigger>
            <If condition={!selectedTags.length}>태그를 선택해주세요</If>
            <If condition={!!selectedTags.length}>
              <ul className="flex gap-8 z-[10]">
                {selectedTags.map((tag) => (
                  <TagSelector.RemovalbleTag
                    key={tag.value}
                    className={cn(
                      tag.type === 'ability' && 'text-[#418CC3] bg-[#E8F1FF]',
                      tag.type === 'personality' && 'text-[#9C6BB3] bg-[#F1E8FF]',
                    )}
                    color={tag.type === 'ability' ? '#418CC3' : '#9C6BB3'}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedTags((prev) => prev.filter(({ value }) => value !== tag.value));
                    }}>
                    {tag.value}
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
                    key={tag.value}
                    className="text-[#418CC3] bg-[#E8F1FF]"
                    onClick={() => {
                      if (selectedTags.length < 3) {
                        setSelectedTags((prev) => [...prev, tag]);
                      }
                    }}>
                    {tag.value}
                  </TagSelector.Tag>
                ))}
              </TagSelector.TagList>

              <div className="h-20 w-full" />

              <TagSelector.TagList title="인성 태그">
                {personalityTags.map((tag) => (
                  <TagSelector.Tag
                    key={tag.value}
                    className="text-[#9C6BB3] bg-[#F1E8FF]"
                    onClick={() => {
                      if (selectedTags.length < 3) {
                        setSelectedTags((prev) => [...prev, tag]);
                      }
                    }}>
                    {tag.value}
                  </TagSelector.Tag>
                ))}
              </TagSelector.TagList>
            </div>
          </TagSelector.Content>
        </TagSelector>
      </TagSelectorGroup>

      <Input
        placeholder="제목을 입력해주세요."
        classNames={{ base: 'w-[552px]' }}
        className="text-24 font-bold text-input-title border-none"
      />

      <Editor />
    </section>
  );
}
