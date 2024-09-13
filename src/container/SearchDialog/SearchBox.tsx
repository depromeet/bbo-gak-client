import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { Spacing } from '@/system/utils/Spacing';
import { TagType } from '@/container/SearchDialog/types';
import clsx from 'clsx';
import { Tag } from './Tag';
import { useState } from 'react';
import { If } from '@/system/utils/If';
import { useGetTags } from './apis/useGetTags';
import { useGetSearchCardTagHistory } from './apis/useGetSearchCardTagHistory';

interface Props {
  hideTagHistory: boolean;
  onSearchSubmit: (tagIdList: number[]) => void;
  onShowEaster: () => void;
}

export function SearchBox({ hideTagHistory, onSearchSubmit, onShowEaster }: Props) {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [tagList, setTagList] = useState<TagType[]>([]);
  const activatedButtonClassName = tagList.length === 0 ? 'text-neutral-30 bg-neutral-5' : 'text-white bg-neutral-95';

  const tags = useGetTags().data;
  const tagHistory = useGetSearchCardTagHistory().data;

  const 역량태그리스트 = tags.filter((tag) => tag.type === '역량');
  const 인성태그리스트 = tags.filter((tag) => tag.type === '인성');

  const onTagClick = (text: TagType) => {
    setTagList([...tagList, text]);
  };

  const onRefreshClick = () => setTagList([]);

  return (
    <div>
      <div
        onClick={() => setDropdownOpened(!dropdownOpened)}
        className="relative w-full px-[16px] py-[12px] border-[1px] border-neutral-40 rounded-[8px] flex justify-between items-center cursor-pointer">
        <div className="flex items-center">
          <Icon name="search" size={24} color={color.neutral95} />
          <Spacing size={16} direction="row" />
          {tagList.length === 0 ? (
            <span className="text-neutral-30 text-label1 font-semibold">이곳을 클릭해 검색할 태그를 선택해주세요.</span>
          ) : (
            <div className="flex items-center gap-[8px] flex-wrap">
              {tagList.map((tag) => (
                <Tag key={tag.name} variant={tag.type}>
                  {tag.name}
                </Tag>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          <button
            className="p-[6px] rounded-[6px] border-[1px] border-neutral-10 m-0"
            onClick={(event) => {
              event.stopPropagation();
              onRefreshClick();
            }}>
            <Icon name="refresh" size={20} />
          </button>
          <If condition={tagList.length !== 0}></If>
          <TouchButton
            className={clsx(activatedButtonClassName, 'px-[16px] py-[8px] rounded-[6px] text-caption1')}
            onClick={(event) => {
              event.stopPropagation();
              setDropdownOpened(false);
              if (tagList.length >= 3) {
                onShowEaster();
                return;
              }
              onSearchSubmit(tagList.map(({ id }) => id));
            }}>
            검색하기
          </TouchButton>
        </div>
        <If condition={dropdownOpened}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute translate-y-[calc(100%+16px)] left-0 bottom-0 w-[calc(100vw-160px-80px)] mt-[16px] p-[32px] bg-white border-[1px] border-neutral-5 rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)]">
            <span className="text-neutral-75 text-label1 font-semibold">직무역량 태그</span>
            <Spacing size={16} />
            <div className="flex gap-[16px] flex-wrap">
              {역량태그리스트.map(({ type, name, id }) => (
                <Tag
                  key={name}
                  variant={type}
                  highlighted={tagList.find((tag) => tag.name === name) != null}
                  onClick={() => onTagClick({ id, type, name })}>
                  {name}
                </Tag>
              ))}
            </div>

            <Spacing size={32} />

            <span className="text-neutral-75 text-label1 font-semibold">기본역량 태그</span>
            <Spacing size={16} />
            <div className="flex gap-[16px] flex-wrap">
              {인성태그리스트.map(({ type, name, id }) => (
                <Tag
                  key={name}
                  variant={type}
                  highlighted={tagList.find((tag) => tag.name === name) != null}
                  onClick={() => onTagClick({ type, name, id })}>
                  {name}
                </Tag>
              ))}
            </div>
          </div>
        </If>
      </div>

      <Spacing size={32} />
      <If condition={!hideTagHistory}>
        <span className="text-body1 text-neutral-95 font-semibold">최근 검색한 태그</span>
        <Spacing size={16} />
        <If condition={tagHistory.length === 0}>
          <div className="text-label1 font-semibold text-neutral-30 text-center">최근 검색한 태그가 없어요</div>
        </If>
        <If condition={tagHistory.length !== 0}>
          <div className="flex gap-[12px]">
            {tagHistory.map(({ type, name, id }) => (
              <Tag key={name} variant={type} onClick={() => onTagClick({ id, type, name })}>
                {name}
              </Tag>
            ))}
          </div>
        </If>
      </If>
    </div>
  );
}
