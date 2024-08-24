import { Dropdown, Icon } from '@/system/components';
import { DropdownMenuSeparator } from '@/system/components/DropdownMenu/DropdownMenu';
import { color } from '@/system/token/color';
import { SwitchCase } from '@/system/utils/SwitchCase';
import { cn } from '@/utils';
import { useState } from 'react';
import { usePatchStatus } from '../api/usePatchStatus';

export function ApplicationStatus({ recruitId }: { recruitId: string }) {
  const [clickStatus, setClickStatus] = useState<string>('서류 통과');

  const { mutate: patchStatus } = usePatchStatus();

  const handlePatchStatus = (status: string) => {
    setClickStatus(status);
    patchStatus({ newStatus: status, id: recruitId });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className="flex items-center justify-center py-[4px] pl-[6px]">
          <span className="text-label2 font-medium text-neutral-80">{clickStatus}</span>
          <Dropdown.TriggerArrow />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content className=" bg-white" align="start">
        {statusList.map((item, index) => (
          <SwitchCase
            key={index}
            value={item.variant}
            caseBy={{
              text:
                item.variant === 'text' ? (
                  <Dropdown.CheckedItem
                    onClick={() => handlePatchStatus(item.text)}
                    //NOTE text-neutral-50 컬러 안먹힘 확인필요
                    className={cn(clickStatus === item.text ? 'text-[#AEB0B8] flex justify-between' : '')}>
                    {item.text}
                    {clickStatus === item.text && <Icon name="check" size={16} color={color.neutral30} />}
                  </Dropdown.CheckedItem>
                ) : null,
              border: <DropdownMenuSeparator />,
            }}
          />
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}

const statusList = [
  { variant: 'text', text: '지원 준비' },
  { variant: 'text', text: '지원 완료' },
  { variant: 'border' },
  { variant: 'text', text: '서류 통과' },
  { variant: 'text', text: '서류 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '면접 통과' },
  { variant: 'text', text: '면접 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '최종 합격' },
  { variant: 'text', text: '최종 탈락' },
] as const;
