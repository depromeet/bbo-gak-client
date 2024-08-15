'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Input } from '@/system/components/Input/Input';
import { TagSelector } from './components/TagSelector/TagSelector';
import { abilityTags, personalityTags, categoryTags, tags, categories } from './components/TagSelector/constants';
import { If } from '@/system/utils/If';
import { cn } from '@/utils';
import { Spacing } from '@/system/utils/Spacing';
import { Icon } from '@/system/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';

const Editor = dynamic(() => import('@/components/Editor/Editor').then(({ Editor }) => Editor), { ssr: false });

export default function Page() {
  const [category, setSelectedCategories] = useState<(typeof categories)[number] | null>(null);
  const [selectedTags, setSelectedTags] = useState<typeof tags>([]);

  return (
    <section className="w-[820px] pt-64 h-full">
      <div className="flex justify-between px-80">
        <Input
          placeholder="제목을 입력해주세요."
          classNames={{ base: 'w-[552px]' }}
          className="text-[24px] font-bold px-0 leading-32 tracking-[-0.0345rem] border-none"
        />
        <div className="flex gap-8 items-center text-neutral-20">
          <p>00.00.00</p>

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

      <TagSelector classNames={{ base: 'px-80', trigger: cn('hover:bg-neutral-1') }}>
        <TagSelector.Title>분류</TagSelector.Title>

        <TagSelector.Trigger>
          <If condition={!category}>카드의 종류를 선택해주세요</If>
          <If condition={!!category}>
            <ul className="flex gap-8">
              <TagSelector.RemovalbleTag
                key={category?.value}
                className="text-yellow-1 bg-yellow-bg-1"
                color="#37383C"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedCategories(null);
                }}>
                <li>{category?.value}</li>
              </TagSelector.RemovalbleTag>
            </ul>
          </If>
        </TagSelector.Trigger>

        <TagSelector.Content>
          <div className="px-16 pt-16 pb-24">
            <TagSelector.Notice>
              어떤 단계를 위한 정보인가요? <span className="text-neutral-30">(택1)</span>
            </TagSelector.Notice>
            <TagSelector.TagList title="분류">
              {categoryTags.map((tag) => (
                <TagSelector.Tag
                  key={tag.value}
                  className="text-yellow-1 bg-yellow-bg-1"
                  onClick={() => {
                    setSelectedCategories(tag);
                  }}>
                  {tag.value}
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
            <ul className="flex gap-8">
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
                  <li>{tag.value}</li>
                </TagSelector.RemovalbleTag>
              ))}
            </ul>
          </If>
        </TagSelector.Trigger>

        <TagSelector.Content>
          <div className="px-16 pt-16 pb-24">
            <TagSelector.Notice>최대 3개까지 설정 가능해요!</TagSelector.Notice>

            <TagSelector.TagList title="역량 태그">
              {abilityTags.map((tag) => (
                <TagSelector.Tag
                  key={tag.value}
                  className="text-[#418CC3] bg-[#E8F1FF]"
                  onClick={() => {
                    if (selectedTags.length < 3 && !selectedTags.find(({ value }) => value === tag.value)) {
                      setSelectedTags((prev) => [...prev, tag]);
                    }
                  }}>
                  {tag.value}
                </TagSelector.Tag>
              ))}
            </TagSelector.TagList>

            <Spacing direction="column" size={20} />

            <TagSelector.TagList title="인성 태그">
              {personalityTags.map((tag) => (
                <TagSelector.Tag
                  key={tag.value}
                  className="text-[#9C6BB3] bg-[#F1E8FF]"
                  onClick={() => {
                    if (selectedTags.length < 3 && !selectedTags.find(({ value }) => value === tag.value)) {
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

      <Spacing direction="column" size={20} />

      <div
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#DBDCDF' }}
        className="px-80 h-[calc(100vh-264px)] overflow-x-hidden">
        <Editor />
      </div>
    </section>
  );
}
