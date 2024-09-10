import { If } from '@/system/utils/If';
import { useGetNotificationList } from './apis/useGetNotificationList';
import { Icon } from '@/system/components';
import { Spacing } from '@/system/utils/Spacing';
import { dday, formatToYYMMDD } from '@/utils/date';
import { cn } from '@/utils/tailwind-util';

export function NotificationList() {
  const { data: notificationList } = useGetNotificationList();

  const getDateText = (date: string) => {
    if (dday(date) >= 0) {
      return '오늘';
    }

    return formatToYYMMDD(date, { separator: '.' });
  };

  return (
    <>
      <If condition={notificationList?.length === 0}>
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col gap-24">
            <Icon name="IllustAlarm" />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-neutral-10 text-body1 font-normal">지금은 알림이 없어요</h2>
              <p className="text-caption2 font-regular text-neutral-35">알림은 30일 뒤에 자동으로 사라져요</p>
            </div>
            <Spacing size={100} />
          </div>
        </div>
      </If>
      <If condition={notificationList && notificationList.length > 0}>
        <Spacing size={40} />
        {notificationList?.map((notification) => (
          <div key={notification.id}>
            <div className={cn('flex flex-col gap-8 py-8', notification.isRead && 'opacity-30')}>
              <div className="flex gap-8">
                <If condition={!notification.isRead}>
                  <div className="flex-shrink-0 w-6 h-6 mt-6 rounded-full bg-red-40" />
                </If>
                <div className="text-white text-label1">
                  <span className="font-semibold underline cursor-pointer">
                    {notification.title}
                    <span className="relative">
                      <span className="absolute top-1 left-2">
                        <Icon name="pageOpen" />
                      </span>
                    </span>
                  </span>
                  <span className="ml-20">{notification.message}</span>
                </div>
              </div>
              <div className="flex justify-end text-caption2 font-regular text-neutral-35">
                {getDateText(notification.createdAt)}
              </div>
            </div>
            <div className="w-full h-[1px] my-16 bg-neutral-75" />
          </div>
        ))}
      </If>
    </>
  );
}
