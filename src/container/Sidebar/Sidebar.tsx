'use client';

import { Logo } from '@/components/Logo';
import { SidebarButton } from '@/container/Sidebar/SidebarButton';
import { MY_INFO_PATH, MY_RECRUIT_PATH } from '@/route';
import { Icon } from '@/system/components';
import { cn } from '@/utils';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { Collapsible } from './Collapsible/Collapsible';
import { deleteCookie } from 'cookies-next';
import { INFO_TYPES, InfoType } from '@/types';
import { TouchButton } from '@/components/TouchButton';
import { Spacing } from '@/system/utils/Spacing';
import { useGetCardTypeCount } from '@/app/(sidebar)/(my-info)/apis/useGetCardTypeCount';
import { useGetRecruitTitles } from '@/app/(sidebar)/my-recruit/api/useGetRecruitTitles';
import { If } from '@/system/utils/If';

const SIDEBAR_CLASSNAME = {
  expanded: 'w-[220px]',
  shrinked: 'w-[72px]',
} as const;

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [myInfoCollapsed, setMyInfoCollapsed] = useState(true);
  const [myJDCollapsed, setMyJDCollapsed] = useState(true);

  const { data: typeCounts } = useGetCardTypeCount();
  const { data: recruiteTitles } = useGetRecruitTitles();

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    router.push('/login');
  };

  const handleInfoTypeClick = (type: InfoType) => {
    const targetPath = `${MY_INFO_PATH}?type=${type}`;

    if (pathname === MY_INFO_PATH) {
      router.replace(targetPath);
      return;
    }

    router.push(targetPath);
  };

  return (
    <nav
      className={`z-[10000] relative flex flex-col px-[16px] py-[32px] h-screen bg-black ${SIDEBAR_CLASSNAME[expanded ? 'expanded' : 'shrinked']}`}>
      <div className="relative mb-[32px]">
        <Logo />
        <button
          aria-label={expanded ? '사이드바 축소' : '사이드바 확장'}
          className={cn('absolute top-[50%] translate-y-[-50%]', expanded ? 'right-0' : 'right-[-62px]')}
          onClick={() => setExpanded(!expanded)}>
          <Icon name="division" color={expanded ? '#5A5C63' : '#AEB0B6'} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-[36px] w-full">
        <SidebarButton iconName="search" selected={false} expanded={expanded} expandedText="태그 검색" />
        <SidebarButton iconName="bell" selected={false} expanded={expanded} expandedText="알림" />
        {/* <SidebarButton iconName="memo" selected={false} expanded={expanded} expandedText="메모 모아보기" /> */}
        <div className="w-full px-[16px] h-[1px] bg-[#37383C]" />
        <Collapsible collapsed={expanded ? myInfoCollapsed : true} onCollapsedChange={setMyInfoCollapsed}>
          <SidebarButton
            iconName={pathname === MY_INFO_PATH ? 'profileFill' : 'profile'}
            selected={pathname === MY_INFO_PATH}
            expanded={expanded}
            expandedText="내 정보"
            withHoverEffect={!expanded}
            withTouchEffect={pathname !== MY_INFO_PATH}
            right={
              <Collapsible.Trigger>
                <Collapsible.ArrowButton />
              </Collapsible.Trigger>
            }
            onClick={() => router.push(MY_INFO_PATH)}
          />
          <Collapsible.Content>
            <Spacing size={14} />
            <div className="flex flex-col">
              {INFO_TYPES.map((type) => (
                <CollapsibleItemButton key={type} onClick={() => handleInfoTypeClick(type)}>
                  <div>{type.replaceAll('_', ' ')}</div>
                  <div className="px-4">{typeCounts?.[type] || 0}</div>
                </CollapsibleItemButton>
              ))}
            </div>
          </Collapsible.Content>
        </Collapsible>
        <Collapsible collapsed={expanded ? myJDCollapsed : true} onCollapsedChange={setMyJDCollapsed}>
          <SidebarButton
            iconName={pathname.includes(MY_RECRUIT_PATH) ? 'workFill' : 'folder'}
            selected={pathname.includes(MY_RECRUIT_PATH)}
            expanded={expanded}
            expandedText="내 공고"
            withHoverEffect={!expanded}
            withTouchEffect={!pathname.includes(MY_RECRUIT_PATH)}
            right={
              <Collapsible.Trigger>
                <Collapsible.ArrowButton />
              </Collapsible.Trigger>
            }
            onClick={() => router.push(MY_RECRUIT_PATH)}
          />
          <Collapsible.Content>
            <If condition={recruiteTitles?.length === 0}>
              <Spacing size={20} />
              <div className="text-caption1 font-regular text-neutral-30 text-center">
                현재 지원중인 공고가 없습니다.
              </div>
            </If>
            <If condition={recruiteTitles?.length !== 0}>
              <Spacing size={14} />
              <div className="flex flex-col">
                {recruiteTitles?.map((data) => (
                  <CollapsibleItemButton key={data.id} onClick={() => router.push(`${MY_RECRUIT_PATH}/${data.id}`)}>
                    <div className="px-6 truncate">{data.title}</div>
                  </CollapsibleItemButton>
                ))}
              </div>
              <Spacing size={32} />
              <div className="flex justify-center">
                <TouchButton
                  className="bg-neutral-80 text-neutral-30 px-8 py-6 rounded-6 text-caption1 font-regular"
                  onClick={() => router.push(MY_RECRUIT_PATH)}>
                  모든 공고 보기
                </TouchButton>
              </div>
            </If>
          </Collapsible.Content>
        </Collapsible>
      </div>

      <div className="w-full mt-auto flex flex-col items-center gap-[28px]">
        {/* <SidebarButton iconName="setting" selected={false} expanded={expanded} expandedText="내 설정" /> */}
        <SidebarButton
          iconName="logout"
          selected={false}
          expanded={expanded}
          expandedText="로그아웃"
          onClick={logout}
        />
      </div>
    </nav>
  );
}

function CollapsibleItemButton({ onClick, children }: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <TouchButton
      onClick={onClick}
      className="flex justify-between text-neutral-10 py-6 hover:bg-neutral-80 mx-[-16px] px-[22px] text-label2 font-regular">
      {children}
    </TouchButton>
  );
}
