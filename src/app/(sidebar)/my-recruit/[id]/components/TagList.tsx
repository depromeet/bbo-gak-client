import { TagSelector } from '@/app/(sidebar)/write/[id]/components/TagSelector/TagSelector';
import { TouchButton } from '@/components/TouchButton';
import { Button, ButtonProps, Icon, Text } from '@/system/components';
import { color } from '@/system/token/color';
import { If } from '@/system/utils/If';
import { StrictPropsWithChildren, TagType } from '@/types';
import { cn } from '@/utils';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useGetAllTags } from '../api/useGetAllTag';
import { TAG_TYPE_COLOR, colorStyle } from '../mocks';

interface TagListProps {
  selectedTags: number[];
  setSelectedTags: (tags: number[]) => void;
}

export default function TagList({ selectedTags, setSelectedTags }: TagListProps) {
  const { data: tagsData } = useGetAllTags();

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
    <div className="flex w-full items-center my-[30px] Gap">
      <div className="flex mr-[24px]">
        <Icon name="tag" size={28} />
      </div>

      {viewAllTags ? (
        <TagSelector classNames={{ base: 'w-full mx-[24px]', trigger: cn('hover:bg-neutral-1') }}>
          <TagSelector.Content
            defaultOpen
            className="absolute w-full -top-28 -left-8 rounded-bl-12 rounded-br-12 rounded-12 bg-white">
            <div className="p-20">
              <TagSelector.Notice>
                <div className="flex justify-between items-center pr-1">
                  <p className="text-caption1 font-medium">원하는 태그로 필터링 해보세요</p>
                  <TouchButton
                    layout
                    whileHover="hover"
                    onClick={handleResetTag}
                    className="relative rounded-[6px] border border-[#DBDCDF] p-6">
                    <Icon name="refresh" size={20} color={color.neutral95} />
                    <motion.div
                      className="absolute top-full left-1/2 translate-x-[-50%] mt-[4px] w-max px-[10px] py-[4px] rounded-[6px] bg-[#70737C] pointer-events-none"
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}>
                      <Text typography="body1" color="white">
                        태그 필터 초기화
                      </Text>
                    </motion.div>
                  </TouchButton>
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
        <>
          {selectedTags.length > 0 && (
            <TouchButton
              layout
              whileHover="hover"
              onClick={handleResetTag}
              className="relative rounded-[6px] border border-[#DBDCDF] p-6 mr-14">
              <Icon name="refresh" size={20} color={color.neutral95} />
              <motion.div
                className="absolute top-full left-1/2 translate-x-[-50%] mt-[4px] w-max px-[10px] py-[4px] rounded-[6px] bg-[#70737C] pointer-events-none"
                initial={{ opacity: 0 }}
                variants={{ hover: { opacity: 1 } }}>
                <Text typography="body1" color="white">
                  태그 필터 초기화
                </Text>
              </motion.div>
            </TouchButton>
          )}

          <div
            ref={tagContainerRef}
            className="flex w-full flex-wrap relative gap-[12px] overflow-hidden h-38 items-start">
            {tags &&
              tags.map((tag) => (
                <Tag
                  key={tag.id}
                  className={cn(
                    selectedTags.includes(tag.id)
                      ? colorStyle[TAG_TYPE_COLOR[tag.type]]
                      : 'text-neutral-50 bg-neutral-3',
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
        </>
      )}

      <If condition={isOverflowing}>
        <div className="right-0 bg-clip-padding bg-left bg-gradient-to-r from-white to-transparent w-fit">
          <TouchButton
            layout
            aria-label="downChevron button"
            whileHover="hover"
            onClick={() => setViewAllTags((prev) => !prev)}
            className="relative p-[10px] mr-14 rounded-full bg-white border-[1px] border-neutral-10 max-h-[42px]">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: viewAllTags ? 180 : 0 }}
              transition={{ duration: 0.3 }}>
              <Icon name="downChevron" color={color.neutral40} />
            </motion.div>

            <motion.div
              className="absolute top-full left-1/2 translate-x-[-50%] mt-[4px] w-max px-[10px] py-[4px] rounded-[6px] bg-[#70737C] pointer-events-none"
              initial={{ opacity: 0 }}
              variants={{ hover: { opacity: 1 } }}>
              <Text typography="body1" color="white">
                모든 태그 보기
              </Text>
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
