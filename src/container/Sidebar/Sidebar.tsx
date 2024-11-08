'use client';

import { useGetCardTypeCount } from '@/app/(sidebar)/(my-info)/apis/useGetCardTypeCount';
import { useGetRecruitTitles } from '@/app/(sidebar)/my-recruit/api/useGetRecruitTitles';
import { TouchButton } from '@/components/TouchButton';
import { SidebarButton } from '@/container/Sidebar/SidebarButton';
import { MY_INFO_PATH, MY_RECRUIT_PATH } from '@/route';
import { Icon } from '@/system/components';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { If } from '@/system/utils/If';
import { Spacing } from '@/system/utils/Spacing';
import { INFO_TYPES, InfoType } from '@/types';
import { cn } from '@/utils';
import { deleteCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { Collapsible } from './Collapsible/Collapsible';
import { useNotificationContext } from '@/components/Notification/context';
import { LogoOnlyLeaf } from '@/components/LogoOnlyLeaf';
import { SearchDialog } from '../SearchDialog/SearchDialog';
import { AsyncBoundaryWithQuery } from '@/lib';
import { useGetNotificationCount } from '@/components/Notification/apis/useGetNotificationCount';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [searchDialogOpened, setSearchDialogOpened] = useState(false);
  const [myInfoCollapsed, setMyInfoCollapsed] = useState(true);
  const [myJDCollapsed, setMyJDCollapsed] = useState(true);

  const { isOpen: isNotificationOpen, toggle: toggleNotification } = useNotificationContext();

  const { data: notificationCount } = useGetNotificationCount();
  const { data: typeCounts } = useGetCardTypeCount();
  const { data: recruiteTitles } = useGetRecruitTitles();

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('jobSelection');
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
  const isRecruitPage = pathname.includes(MY_RECRUIT_PATH);

  return (
    <motion.nav
      variants={{
        expanded: { width: '220px' },
        shrinked: { width: '72px' },
      }}
      animate={expanded ? 'expanded' : 'shrinked'}
      className={`z-[10000] relative shrink-0 flex flex-col px-[16px] py-[32px] h-screen bg-black`}>
      <div className="flex relative mb-[32px]">
        <TouchButton onClick={() => router.push(MY_INFO_PATH)}>
          <LogoOnlyLeaf />
        </TouchButton>
        <button
          aria-label={expanded ? '사이드바 축소' : '사이드바 확장'}
          className={cn(
            'absolute top-[50%] translate-y-[-50%] p-6 rounded-6',
            expanded ? 'right-0 hover:bg-neutral-80' : 'right-[-68px] bg-neutral-1 border hover:bg-neutral-3',
          )}
          onClick={() => setExpanded(!expanded)}>
          <Icon name="division" color={expanded ? '#5A5C63' : '#AEB0B6'} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-[36px] w-full">
        <SidebarButton
          iconName="search"
          selected={false}
          expanded={expanded}
          expandedText="태그 검색"
          onClick={() => setSearchDialogOpened(true)}
        />

        <SidebarButton
          iconName={!!notificationCount?.number ? 'bellWithRedDot' : 'bell'}
          selected={isNotificationOpen}
          expanded={expanded}
          expandedText="알림"
          right={
            <div className="px-4 rounded-3 bg-neutral-80 text-neutral-35 text-caption1 font-medium">
              {notificationCount?.number || '0'}
            </div>
          }
          onClick={toggleNotification}
        />
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
                  <div className="truncate">{type.replaceAll('_', ' ')}</div>
                  <div className="px-4 truncate">{typeCounts?.[type] || 0}</div>
                </CollapsibleItemButton>
              ))}
            </div>
          </Collapsible.Content>
        </Collapsible>
        <Collapsible collapsed={expanded ? myJDCollapsed : true} onCollapsedChange={setMyJDCollapsed}>
          <SidebarButton
            iconName={isRecruitPage ? 'workFill' : 'folder'}
            selected={isRecruitPage}
            expanded={expanded}
            expandedText="내 공고"
            withHoverEffect={!expanded}
            withTouchEffect={!isRecruitPage}
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

      <AsyncBoundaryWithQuery>
        <SearchDialog open={searchDialogOpened} onClose={() => setSearchDialogOpened(false)} />
      </AsyncBoundaryWithQuery>
    </motion.nav>
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
