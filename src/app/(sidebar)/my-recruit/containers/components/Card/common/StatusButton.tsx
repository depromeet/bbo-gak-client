import { SwitchCase } from '@/system/utils/SwitchCase';
import { Icon } from '@/system/components';
import { Dropdown } from '@/system/components';
import { color } from '@/system/token/color';
import { cn } from '@/utils';
import { recruitStatusList } from '@/app/(sidebar)/my-recruit/constant';

interface Props {
  currentStatus: string;
  onRecruitStatusChange: (status: string) => void;
}

export function StatusButton({ currentStatus, onRecruitStatusChange }: Props) {
  return (
    <Dropdown>
      <Dropdown.Trigger className="outline-none">
        <div className="flex items-center">
          <span className="text-label2 text-neutral-35">{currentStatus}</span>
          <Dropdown.TriggerArrow />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {recruitStatusList.map((item, index) => (
          <SwitchCase
            key={index}
            value={item.variant}
            caseBy={{
              text:
                item.variant === 'text' ? (
                  <Dropdown.CheckedItem
                    checked={currentStatus === item.text}
                    disabled={currentStatus === item.text}
                    onClick={() => onRecruitStatusChange(item.text)}>
                    {item.text}
                  </Dropdown.CheckedItem>
                ) : null,
              border: <Dropdown.Separator />,
            }}
          />
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
