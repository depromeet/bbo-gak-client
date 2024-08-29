import { TagSelector } from '@/app/(sidebar)/write/[id]/components/TagSelector/TagSelector';
import { TouchButton } from '@/components/TouchButton';
import { Button, ButtonProps, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { If } from '@/system/utils/If';
import { StrictPropsWithChildren, TagType } from '@/types';
import { cn } from '@/utils';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { TAG_TYPE_COLOR, colorStyle } from '../mocks';

interface TagListProps {
  tagsData: TagType[];
  selectedTags: number[];
  setSelectedTags: (tags: number[]) => void;
}

export default function TagList({ tagsData, selectedTags, setSelectedTags }: TagListProps) {
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<TagType[]>(tagsData || []);
  const [viewAllTags, setViewAllTags] = useState<boolean>(false);

  const [isOverflowing, setIsOverflowing] = useState<boolean>(true);

  const handleTagClick = (id: number) => {
    const clickedTag = tags.find((tag) => tag.id === id);

    if (clickedTag) {
      const updatedTags = [clickedTag, ...tags.filter((tag) => tag.id !== id)];
      setTags(updatedTags);

      if (selectedTags.includes(id)) {
        setSelectedTags(selectedTags.filter((selectedId) => selectedId !== id));
      } else {
        setSelectedTags([...selectedTags, id]);
      }
    }
  };

  const handleResetTag = () => {
    setSelectedTags([]);
    setViewAllTags(false);
  };

  return (
    <div className="flex items-center ml-[24px] my-[30px] ">
      <div className="flex mr-[24px]">
        <Icon name="tag" size={28} />
      </div>
      {viewAllTags ? (
        <TagSelector classNames={{ base: 'w-full mx-[24px]', trigger: cn('hover:bg-neutral-1') }}>
          <TagSelector.Content defaultOpen className="absolute w-full -top-28 -left-8 bg-white">
            <div className="px-16 pt-16 pb-24">
              <TagSelector.Notice>
                <div className="flex justify-between items-center pr-1">
                  <p className="text-caption1 font-medium">원하는 태그로 필터링 해보세요</p>
                  <button onClick={handleResetTag} className="rounded-[6px] border border-[#DBDCDF] p-6">
                    <Icon name="refresh" size={20} color={color.neutral95} />
                  </button>
                </div>
              </TagSelector.Notice>
              <TagSelector.TagList title="">
                {tagsData &&
                  tagsData.map((tag) => (
                    <Tag
                      key={tag.id}
                      className={cn(
                        selectedTags.includes(tag.id)
                          ? colorStyle[TAG_TYPE_COLOR[tag.type]]
                          : 'text-neutral-50 bg-neutral-3',
                      )}
                      onClick={() => handleTagClick(tag.id)}>
                      {tag.name}
                    </Tag>
                  ))}
              </TagSelector.TagList>
            </div>
          </TagSelector.Content>
        </TagSelector>
      ) : (
        <div ref={tagContainerRef} className="flex flex-wrap relative gap-[12px] overflow-hidden h-38 items-start">
          {selectedTags.length > 0 && (
            <button onClick={handleResetTag} className="rounded-[6px] border border-[#DBDCDF] p-6">
              <Icon name="refresh" size={20} color={color.neutral95} />
            </button>
          )}
          {tags &&
            tags.map((tag) => (
              <Tag
                key={tag.id}
                className={cn(
                  selectedTags.includes(tag.id) ? colorStyle[TAG_TYPE_COLOR[tag.type]] : 'text-neutral-50 bg-neutral-3',
                  'mb-10 mt-5 flex-shrink-0',
                )}
                onClick={() => handleTagClick(tag.id)}>
                {tag.name}
              </Tag>
            ))}
          <If condition={isOverflowing}>
            <Shadow />
          </If>
        </div>
      )}

      <If condition={isOverflowing}>
        <div className="right-0 bg-clip-padding bg-left bg-gradient-to-r from-white to-transparent w-fit">
          <TouchButton
            layout
            aria-label="downChevron button"
            onClick={() => setViewAllTags((prev) => !prev)}
            className="p-[10px] rounded-full bg-white border-[1px] border-neutral-10">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: viewAllTags ? 180 : 0 }}
              transition={{ duration: 0.3 }}>
              <Icon name="downChevron" color={color.neutral40} />
            </motion.div>
          </TouchButton>
        </div>
      </If>
    </div>
  );
}

function Tag({ className, ...props }: StrictPropsWithChildren<ButtonProps>) {
  return (
    <Button
      {...props}
      className={cn('py-4 px-8 text-[14px] rounded-4 font-medium leading-20 min-x-[66px]', className)}
    />
  );
}

function Shadow() {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-[50px] pointer-events-none bg-gradient-to-r from-transparent to-white"></div>
  );
}
