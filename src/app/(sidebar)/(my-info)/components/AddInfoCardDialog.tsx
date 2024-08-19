import { Button, Icon } from '@/system/components';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/system/components/Dialog/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';
import { Tag } from '@/system/components/Tag/Tag';
import { TagType, InfoType, TAG_TYPE_COLOR, INFO_TYPES } from '@/types/info';
import { PropsWithChildren, useState } from 'react';

const mockTagList: TagType[] = [
  { id: 1, name: 'IT', type: '역량' },
  { id: 2, name: 'UI/UX', type: '인성' },
  { id: 3, name: '프로젝트 경험', type: '역량' },
];

export function AddInfoCardDialog({ children }: PropsWithChildren) {
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [typeList, setTypeList] = useState<InfoType[]>([]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTagList([]);
          setTypeList([]);
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="h-46 flex gap-8 px-12 items-center bg-neutral-1 rounded-8">
                  {!!tagList.length ? (
                    tagList.map((tag) => (
                      <Tag key={tag.id} color={TAG_TYPE_COLOR[tag.type]}>
                        {tag.name}
                      </Tag>
                    ))
                  ) : (
                    <div className="w-full flex justify-between text-neutral-30">
                      키워드 태그를 등록해주세요
                      <Icon name="down" size={24} color="#70737C" />
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {mockTagList.map((tag) => (
                  <DropdownMenuItem key={tag.id} onClick={() => setTagList((prev) => [...prev, tag])}>
                    {tag.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-8 h-46 px-12 items-center bg-neutral-1 rounded-8">
                  {!!typeList.length ? (
                    typeList.map((type) => <Tag key={type}>{type}</Tag>)
                  ) : (
                    <div className="w-full flex justify-between text-neutral-30">
                      카드 분류 태그를 등록해주세요
                      <Icon name="down" size={24} color="#70737C" />
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {INFO_TYPES.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setTypeList((prev) => [...prev, type])}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            className="rounded-6 bg-neutral-95 text-white py-13 disabled:bg-neutral-5 disabled:text-neutral-30"
            disabled={!tagList.length || !typeList.length}>
            선택 완료
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
