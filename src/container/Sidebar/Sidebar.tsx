'use client';

import { SidebarButton } from '@/container/Sidebar/SidebarButton';
import { Icon } from '@/system/components';
import { useState } from 'react';
import { Collapsible } from './Collapsible/Collapsible';

// FIXME:
const SELECTED = true;
const SIDEBAR_FOLD_WIDTH = 72;
const SIDEBAR_EXPANDED_WIDTH = 220;

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [myInfoCollapsed, setMyInfoCollapsed] = useState(true);
  const [jdInfoCollapsed, setJDInfoCollapsed] = useState(true);

  return (
    <nav
      className="relative flex flex-col items-center px-[16px] py-[32px] h-screen bg-black"
      style={{ width: expanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_FOLD_WIDTH }}>
      <div className="relative mb-[32px]">
        <div className="w-[40px] h-[40px]" />
        <div className="absolute top-[50%] translate-y-[-50%] left-[72px]" onClick={() => setExpanded(!expanded)}>
          <Icon name="division" color={expanded ? '#5A5C63' : '#AEB0B6'} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-[36px] w-full">
        <SidebarButton iconName="search" selected={false} expanded={expanded} expandedText="태그 검색" />
        <SidebarButton iconName="bell" selected={false} expanded={expanded} expandedText="알림" />
        <SidebarButton iconName="memo" selected={false} expanded={expanded} expandedText="메모 모아보기" />

        <div className="w-full px-[16px] h-[1px] bg-[#37383C]" />

        <Collapsible collapsed={expanded ? myInfoCollapsed : true} onCollapsedChange={setMyInfoCollapsed}>
          <SidebarButton
            iconName={SELECTED ? 'profileFill' : 'profile'}
            selected={SELECTED}
            expanded={expanded}
            expandedText="내 정보"
            withHoverEffect={!expanded}
            withTouchEffect={!SELECTED}
            right={
              <Collapsible.Trigger>
                <Collapsible.ArrowButton />
              </Collapsible.Trigger>
            }
          />
          <Collapsible.Content>
            {/* FIXME: */}
            <div style={{ color: 'white' }}>열렸다!</div>
          </Collapsible.Content>
        </Collapsible>
        <Collapsible collapsed={expanded ? jdInfoCollapsed : true} onCollapsedChange={setJDInfoCollapsed}>
          <SidebarButton
            iconName="folder"
            selected={false}
            expanded={expanded}
            expandedText="내 공고"
            withHoverEffect={!expanded}
            right={
              <Collapsible.Trigger>
                <Collapsible.ArrowButton />
              </Collapsible.Trigger>
            }
          />
          <Collapsible.Content>
            <div style={{ color: 'white' }}>열렸다!</div>
          </Collapsible.Content>
        </Collapsible>
      </div>

      <div className="w-full mt-auto flex flex-col items-center gap-[28px]">
        <SidebarButton iconName="setting" selected={false} expanded={expanded} expandedText="내 설정" />
        <SidebarButton iconName="logout" selected={false} expanded={expanded} expandedText="로그아웃" />
      </div>
    </nav>
  );
}
