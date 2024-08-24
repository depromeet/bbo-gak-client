'use client';

import { SidebarButton } from '@/container/Sidebar/SidebarButton';
import { Icon } from '@/system/components';
import { useState } from 'react';
import { Collapsible } from './Collapsible/Collapsible';
import { useRouter, usePathname } from 'next/navigation';
import { MY_RECRUIT_PATH, MY_INFO_PATH } from '@/route';

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

  return (
    <nav
      className={`relative flex flex-col items-center px-[16px] py-[32px] h-screen bg-black ${SIDEBAR_CLASSNAME[expanded ? 'expanded' : 'shrinked']}`}>
      <div className="relative mb-[32px]">
        <div className="w-[40px] h-[40px]" />
        <button
          aria-label={expanded ? '사이드바 축소' : '사이드바 확장'}
          className="absolute top-[50%] translate-y-[-50%] left-[72px]"
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
            {/* FIXME: */}
            <div style={{ color: 'white' }}>준비중이에요!</div>
          </Collapsible.Content>
        </Collapsible>
        <Collapsible collapsed={expanded ? myJDCollapsed : true} onCollapsedChange={setMyJDCollapsed}>
          <SidebarButton
            iconName="folder"
            selected={pathname === MY_RECRUIT_PATH}
            expanded={expanded}
            expandedText="내 공고"
            withHoverEffect={!expanded}
            withTouchEffect={pathname !== MY_RECRUIT_PATH}
            right={
              <Collapsible.Trigger>
                <Collapsible.ArrowButton />
              </Collapsible.Trigger>
            }
            onClick={() => router.push(MY_RECRUIT_PATH)}
          />
          <Collapsible.Content>
            <div style={{ color: 'white' }}>준비중이에요!</div>
          </Collapsible.Content>
        </Collapsible>
      </div>

      <div className="w-full mt-auto flex flex-col items-center gap-[28px]">
        {/* <SidebarButton iconName="setting" selected={false} expanded={expanded} expandedText="내 설정" /> */}
        <SidebarButton iconName="logout" selected={false} expanded={expanded} expandedText="로그아웃" />
      </div>
    </nav>
  );
}
